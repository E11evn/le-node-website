# Session log — Black Hole from scratch

> Written 2026-04-15. Use this to rebuild the effect from zero.

---

## What we built

A real-time, animated black hole rendered entirely on the GPU — no video, no gif, no pre-baked assets.
It lives at `/sandbox` and is a self-contained React component (`components/BlackHole.tsx`).

The reference was **https://singularity.misterprada.com/** — we reverse-engineered its technique
and reproduced it in standard WebGL so it works on all browsers (the original requires WebGPU / Chrome only).

---

## How the effect works (the algorithm)

Everything happens inside a single GLSL fragment shader. No 3D model. Pure math.

```
For every pixel on screen:
  1. Cast a ray from the camera into the scene
  2. March the ray forward in small steps (96 × 0.018 = 1.73 world units)
  3. At each step:
       a. Bend the ray toward the singularity (gravity, 1/r² strength)
       b. Check if the ray is near the equatorial plane (Y ≈ 0) → accretion disk
       c. If inside the disk: sample FBM noise, map to colour, accumulate
       d. If inside event horizon (dist < 0.15): force black, accumulate full opacity
  4. After all steps: add a soft ambient halo to simulate bloom
  5. Output final colour + alpha
```

The "accretion disk" is a thin horizontal slab of animated FBM noise. Inner rings rotate faster,
creating swirling streaks. A 3-stop colour ramp maps brightness → colour.

---

## Files created / modified

| File | What it does |
|------|-------------|
| `components/BlackHole.tsx` | The reusable WebGL component |
| `app/sandbox/page.tsx` | Standalone full-screen test page at `/sandbox` |
| `docs/blackhole.md` | Shader tuning guide |
| `package.json` / `package-lock.json` | Added `three` + `@types/three` |

---

## Dependency

```bash
npm install three @types/three
```

That's the only new dependency. Three.js is used only for WebGL context management
(renderer, scene, camera, material). The entire visual is in the GLSL shader.

---

## Starting over from scratch

### Step 1 — Install Three.js

```bash
npm install three @types/three
```

### Step 2 — Create the component

Create `components/BlackHole.tsx`. The skeleton:

```tsx
'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vert = /* glsl */ `
void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const frag = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2  uResolution;
void main() {
  // ... your ray-march shader here
  gl_FragColor = vec4(col, alpha);
}
`;

export default function BlackHole({ className, style }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene  = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const mat = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
      uniforms: {
        uTime:       { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
      },
    });
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));

    const syncSize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      mat.uniforms.uResolution.value.set(w, h);
    };
    syncSize();
    const ro = new ResizeObserver(syncSize);
    ro.observe(canvas);

    let raf;
    const t0 = performance.now();
    const tick = () => {
      raf = requestAnimationFrame(tick);
      mat.uniforms.uTime.value = (performance.now() - t0) / 1000;
      renderer.render(scene, camera);
    };
    tick();

    return () => { cancelAnimationFrame(raf); ro.disconnect(); mat.dispose(); renderer.dispose(); };
  }, []);

  return <canvas ref={canvasRef} className={className}
           style={{ display: 'block', width: '100%', height: '100%', ...style }} />;
}
```

### Step 3 — Write the fragment shader

The shader has four sections. Build them in order:

#### 3a. Colour ramp

```glsl
vec3 diskColor(float t) {
  t = clamp(t, 0.0, 1.0);
  vec3 hot  = vec3(0.000, 0.263, 0.980);  // #0043FA — your brand blue
  vec3 deep = vec3(0.000, 0.055, 0.228);  // deep blue
  vec3 dark = vec3(0.000, 0.000, 0.000);  // black
  if (t < 0.4) return mix(hot, deep, t / 0.4);
  return           mix(deep, dark, (t - 0.4) / 0.6);
}
```

To pick different colours: hex → GLSL vec3 = divide each RGB channel by 255.
```
#0043FA = rgb(0, 67, 250) → vec3(0.0/255, 67.0/255, 250.0/255) = vec3(0.000, 0.263, 0.980)
```

#### 3b. Procedural noise (FBM)

Needed to generate the swirling disk texture without loading any image.

```glsl
float hash(vec2 p) {
  p = fract(p * vec2(0.1031, 0.1030));
  p += dot(p, p.yx + 33.33);
  return fract((p.x + p.y) * p.x);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1,0)), f.x),
    mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y);
}
float fbm(vec2 p) {              // 5-octave fractal brownian motion
  float v = 0.0, a = 0.5;
  mat2  m = mat2(0.80, -0.60, 0.60, 0.80);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = m*p*2.0+vec2(1.7,9.2); a *= 0.45; }
  return v;
}
mat2 rot2(float a) { float c=cos(a),s=sin(a); return mat2(c,-s,s,c); }
```

#### 3c. Constants — critical to get right

```glsl
#define STEPS    96      // quality
#define DS       0.018   // step size  ← DS × STEPS must exceed camera distance!
#define GRAV     0.22    // gravity bend strength
#define HORIZON  0.15    // event horizon radius
#define DISK_H   0.05    // disk half-thickness
#define EMIT     3.5     // brightness multiplier
```

**The most important rule:** `DS × STEPS > distance from camera to origin`.
Camera is at `(0, 0.35, 1.3)` → distance = ~1.35 units.
`96 × 0.018 = 1.73 > 1.35` ✓

If this rule is broken, **you get a black screen** — rays run out of steps before reaching the disk.
This is the bug we hit and fixed on the first attempt.

#### 3d. Main ray-march loop

```glsl
void main() {
  vec2 uv = (gl_FragCoord.xy / uResolution) * 2.0 - 1.0;
  uv.x   *= uResolution.x / uResolution.y;  // aspect correction

  // Camera — slightly above disk plane for Interstellar-style angle
  vec3 ro = vec3(0.0, 0.35, 1.3);
  vec3 fw = normalize(-ro);
  vec3 ri = normalize(cross(fw, vec3(0,1,0)));
  vec3 up = cross(ri, fw);
  vec3 rd = normalize(fw * 1.65 + ri * uv.x + up * uv.y);

  vec3 rp = ro + rd * hash(uv) * DS;  // dither start pos (anti-banding)

  vec3  col   = vec3(0.0);
  float alpha = 0.0;

  for (int i = 0; i < STEPS; i++) {
    float dist = length(rp);

    // Gravity: bend ray toward singularity
    float g    = DS * GRAV / max(dist * dist, 0.001);
    float fade = smoothstep(2.0, 0.4, dist);
    rd  = normalize(rd - normalize(rp) * g * fade);
    rp += rd * DS;
    dist = length(rp);

    if (dist > 2.2) continue;  // escaped scene

    // Accretion disk (XZ plane, Y ≈ 0)
    float radial = length(rp.xz);
    vec2  dUV    = rot2(radial * 4.27 - uTime * 0.11) * rp.xz * 2.0;
    float n1     = fbm(dUV + vec2(uTime * 0.05, 0.0)) * 2.0;
    float n2     = fbm(dUV * 1.003 + vec2(0.0, uTime * 0.04)) * 2.0;

    float yAbs = abs(rp.y);
    float dMsk = max(1.0 - (yAbs/DISK_H)*(yAbs/DISK_H), 0.0);
    float dn1  = n1 * dMsk;
    float dn2  = n2 * dMsk;

    float bright = radial + (dn1 - 0.78)*1.5 + (dn1 - dn2)*19.75;
    vec3  dCol   = diskColor(bright) * EMIT;

    bool inBH = dist < HORIZON;
    vec3 c    = inBH ? vec3(0.0) : dCol;

    // Alpha compositing (front-to-back)
    float noiseD  = (dn1 - 0.75) * -0.6;
    float dWeight = smoothstep(DISK_H, 0.0, yAbs + noiseD)
                  * smoothstep(1.5, 0.0, radial);
    float a = inBH ? 1.0 : dWeight;

    col   = mix(col,   c,    (1.0 - alpha) * a);
    alpha = mix(alpha, 1.0,  a);
  }

  // Ambient halo (mimics bloom without post-processing)
  float rho  = length(uv);
  float halo = exp(-rho * 2.8) * 0.12;
  col  += vec3(0.0, 0.10, 0.52) * halo;
  alpha = clamp(alpha + halo * 2.0, 0.0, 1.0);

  gl_FragColor = vec4(col, alpha);
}
```

### Step 4 — Create the sandbox page

```tsx
// app/sandbox/page.tsx
import type { Metadata } from 'next'
import BlackHole from '@/components/BlackHole'

export const metadata: Metadata = {
  title: 'Sandbox — le-node',
  robots: { index: false, follow: false },
}

export default function SandboxPage() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      <BlackHole className="absolute inset-0" />
    </main>
  )
}
```

### Step 5 — Run and verify

```bash
npm run dev
# open http://localhost:3000/sandbox
```

You should see a glowing blue accretion disk with a black event horizon in the center,
viewed from a slight upward angle. The disk slowly rotates.

---

## Lessons learned / gotchas

### 1. DS × STEPS must exceed camera distance — the critical rule

This is the #1 mistake you can make. If the total march distance is shorter than the
camera-to-scene distance, all rays terminate before reaching the disk → pure black screen.

```
camera distance ≈ length(ro) = length(0, 0.35, 1.3) ≈ 1.35 units
DS × STEPS must be > 1.35
```

Our first attempt used DS=0.009, STEPS=96, camera at z=2.4:
- Total march: 0.86 units
- Camera distance: 2.4 units
- Result: **black screen** ← rays never reached the disk

Fix: move camera closer (z=1.3) AND increase DS (0.009→0.018).

### 2. The original uses WebGPU — we used WebGL for compatibility

The reference site (singularity.misterprada.com) runs Three.js r125 with the WebGPU renderer
and Three.js Shader Language (TSL). This only works in Chrome/Edge.

Our implementation uses standard `WebGLRenderer` + raw GLSL → works everywhere.
The visual result is equivalent.

### 3. No external textures needed

The original loads a `noise_deep.png` and a `nebula.png`. We replace both with:
- Procedural FBM noise (the `fbm()` function) — no file needed
- No star background (user wanted black background only)

### 4. The disk is in the XZ plane, camera above it

The disk is at Y≈0 (XZ plane). Camera is at Y=0.35 (above the plane). This gives the
classic ellipse look. To change the viewing angle, modify `ro.y`:
- `ro.y = 0` → pure side view (disk is a line)
- `ro.y = 0.35` → current (~15° above)
- `ro.y = 1.0` → nearly top-down (disk is a circle)

### 5. The colour ramp drives the entire look

Changing the 3 `vec3` values in `diskColor()` is the fastest way to restyle.
The `hot` colour (t=0) is the brightest point — use your most vibrant brand colour there.

---

## Reference: the original site's stack (for future reference)

- **URL:** https://singularity.misterprada.com/
- **Renderer:** Three.js r125 — WebGPU branch with TSL (Three.js Shader Language)
- **Technique:** volumetric ray-march on a unit sphere (DoubleSide), 128 iterations, DS=0.0071
- **Disk texture:** `noise_deep.png` (repeat-wrapped 2D noise)
- **Background:** `nebula.png` (equirectangular HDR, sampled via deflected ray direction)
- **Post-processing:** UnrealBloom (threshold=0, strength=0.217)
- **Other deps:** GSAP 3.12.7, Tweakpane 4.0.5, MeshoptDecoder (WASM)
- **Bundle size:** ~1.35 MB minified

Our implementation achieves a visually equivalent result in ~200 lines of code with a single dependency (Three.js).

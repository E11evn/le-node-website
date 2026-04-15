'use client';

/**
 * BlackHole — ray-marched WebGL black hole component.
 *
 * The parent element must have an explicit height.
 * Example:
 *   <div className="w-screen h-screen">
 *     <BlackHole />
 *   </div>
 *
 * See /docs/blackhole.md for a full guide on tweaking the shader.
 */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// ─── Vertex shader (fullscreen quad — no MVP transform needed) ───────────────
const vert = /* glsl */ `
void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

// ─── Fragment shader — volumetric ray-marched black hole ─────────────────────
const frag = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec2  uResolution;

// ── Colour ramp ──────────────────────────────────────────────────────────────
// peak #0043FA (bright blue) → #000E3A (deep blue) → #000000 (black)
vec3 diskColor(float t) {
  t = clamp(t, 0.0, 1.0);
  vec3 hot  = vec3(0.000, 0.263, 0.980);   // #0043FA
  vec3 deep = vec3(0.000, 0.055, 0.228);   // #000E3A
  vec3 dark = vec3(0.000, 0.000, 0.000);
  if (t < 0.4) return mix(hot, deep, t / 0.4);
  return           mix(deep, dark, (t - 0.4) / 0.6);
}

// ── Noise helpers ────────────────────────────────────────────────────────────
float hash(vec2 p) {
  p  = fract(p * vec2(0.1031, 0.1030));
  p += dot(p, p.yx + 33.33);
  return fract((p.x + p.y) * p.x);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i),              hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}
// 5-octave FBM — drives the swirling accretion disk texture
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2  m = mat2(0.80, -0.60, 0.60, 0.80);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p  = m * p * 2.0 + vec2(1.7, 9.2);
    a *= 0.45;
  }
  return v;
}
mat2 rot2(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

// ── Constants — edit these to tweak the look ─────────────────────────────────
#define STEPS    96       // ray-march iterations (lower = faster, less detail)
#define DS       0.009    // step size in world units
#define GRAV     0.28     // gravitational bend strength
#define HORIZON  0.15     // event horizon radius (black sphere size)
#define DISK_H   0.04     // disk half-thickness
#define EMIT     3.5      // emission multiplier (disk brightness)

void main() {
  // Aspect-correct screen UV centred at (0,0)
  vec2 uv  = (gl_FragCoord.xy / uResolution) * 2.0 - 1.0;
  uv.x    *= uResolution.x / uResolution.y;

  // ── Perspective camera ───────────────────────────────────────────────────
  // Positioned slightly above the equatorial plane so the disk reads as an
  // ellipse — the classic Interstellar viewing angle.
  vec3 ro = vec3(0.0, 0.50, 2.4);
  vec3 fw = normalize(-ro);                              // look at origin
  vec3 ri = normalize(cross(fw, vec3(0.0, 1.0, 0.0)));
  vec3 up = cross(ri, fw);
  vec3 rd = normalize(fw * 1.65 + ri * uv.x + up * uv.y);

  // Per-pixel dither — breaks up step-banding artefacts
  vec3 rp = ro + rd * hash(uv) * DS;

  vec3  col   = vec3(0.0);
  float alpha = 0.0;

  // ── Ray-march loop ───────────────────────────────────────────────────────
  for (int i = 0; i < STEPS; i++) {
    float dist = length(rp);

    // Gravitational lensing: bend rd toward the singularity (1/r² falloff)
    float g    = DS * GRAV / max(dist * dist, 0.001);
    float fade = smoothstep(2.0, 0.4, dist);
    rd  = normalize(rd - normalize(rp) * g * fade);
    rp += rd * DS;
    dist = length(rp);

    if (dist > 2.8) continue;   // ray escaped — skip

    // ── Accretion disk (lies in the XZ plane, Y ≈ 0) ──────────────────────
    float radial = length(rp.xz);

    // Spiral UV: inner rings rotate faster → streaming streaks
    vec2  dUV = rot2(radial * 4.27 - uTime * 0.11) * rp.xz * 2.0;

    // Two slightly offset FBM samples → high-frequency shimmer
    float n1 = fbm(dUV + vec2(uTime * 0.05, 0.0))         * 2.0;
    float n2 = fbm(dUV * 1.003 + vec2(0.0, uTime * 0.04)) * 2.0;

    // Parabolic disk thickness mask — falls to 0 at ±DISK_H in Y
    float yAbs = abs(rp.y);
    float dMsk = max(1.0 - (yAbs / DISK_H) * (yAbs / DISK_H), 0.0);
    float dn1  = n1 * dMsk;
    float dn2  = n2 * dMsk;

    // Brightness → colour ramp: low t = bright blue, high t = black
    float bright = radial + (dn1 - 0.78) * 1.5 + (dn1 - dn2) * 19.75;
    vec3  dCol   = diskColor(bright) * EMIT;

    // Event horizon absorbs everything
    bool  inBH = dist < HORIZON;
    vec3  c    = inBH ? vec3(0.0) : dCol;

    // ── Front-to-back alpha compositing ───────────────────────────────────
    float noiseD  = (dn1 - 0.75) * -0.6;
    float dWeight = smoothstep(DISK_H, 0.0, yAbs + noiseD)
                  * smoothstep(1.5, 0.0, radial);
    float a = inBH ? 1.0 : dWeight;

    col   = mix(col,   c,    (1.0 - alpha) * a);
    alpha = mix(alpha, 1.0,  a);
  }

  // ── Ambient blue halo — simulates post-process bloom ─────────────────────
  float rho  = length(uv);
  float halo = exp(-rho * 2.8) * 0.12;
  col  += vec3(0.0, 0.10, 0.52) * halo;
  alpha = clamp(alpha + halo * 2.0, 0.0, 1.0);

  gl_FragColor = vec4(col, alpha);
}
`;

// ─── Component ───────────────────────────────────────────────────────────────

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export default function BlackHole({ className, style }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene  = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const mat = new THREE.ShaderMaterial({
      vertexShader:   vert,
      fragmentShader: frag,
      transparent:    true,
      uniforms: {
        uTime:       { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
      },
    });

    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));

    const syncSize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false); // false = don't override CSS
      mat.uniforms.uResolution.value.set(w, h);
    };
    syncSize();

    const ro = new ResizeObserver(syncSize);
    ro.observe(canvas);

    let raf: number;
    const t0 = performance.now();
    const tick = () => {
      raf = requestAnimationFrame(tick);
      mat.uniforms.uTime.value = (performance.now() - t0) / 1000;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  );
}

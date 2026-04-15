# Black Hole — shader guide

Component lives at `components/BlackHole.tsx`.  
Preview at `/sandbox`.

---

## How it works

The effect is a **volumetric ray-marcher** running entirely on the GPU inside a WebGL fragment shader. No external 3D model — every pixel is computed mathematically.

```
Camera
  │
  │  for each screen pixel:
  │    cast a ray into the scene
  │    at each of 96 steps:
  │      bend the ray toward the singularity (gravity)
  │      if near the disk plane → sample noise → emit colour
  │      if inside event horizon → force black
  └─→  composite accumulated colour + alpha
```

---

## Quick-tweak constants

All live at the top of the fragment shader (`frag` string in `BlackHole.tsx`):

```glsl
#define STEPS    96     // quality — lower is faster (try 48 for mobile)
#define DS       0.018  // step size — DS × STEPS must exceed camera distance
#define GRAV     0.22   // gravity — higher bends light more dramatically
#define HORIZON  0.15   // radius of the black sphere (event horizon)
#define DISK_H   0.05   // disk half-thickness (try 0.10 for a fatter disk)
#define EMIT     3.5    // disk brightness multiplier
```

---

## Colour palette

The disk uses a 3-stop gradient mapped through a `diskColor(t)` function.
`t = 0` is the brightest (innermost) colour, `t = 1` is black.

```glsl
vec3 hot  = vec3(0.000, 0.263, 0.980);   // #0043FA  ← peak brightness
vec3 deep = vec3(0.000, 0.055, 0.228);   // #000E3A  ← mid tone
vec3 dark = vec3(0.000, 0.000, 0.000);   // #000000  ← outer edge
```

**To change the colour scheme**, replace the hex values.
Use this converter to go from hex → GLSL `vec3`: divide each RGB channel by 255.

```
#FF6B00  →  vec3(1.000, 0.420, 0.000)   // orange example
#00C9FF  →  vec3(0.000, 0.788, 1.000)   // cyan example
```

---

## Camera angle

The camera is set slightly above the disk plane to give the classic
"Interstellar" look where the disk reads as an ellipse:

```glsl
vec3 ro = vec3(0.0, 0.50, 2.4);  // (x, height above disk, distance)
```

| `ro.y` | effect |
|--------|--------|
| `0.0`  | pure side view — disk is a thin line |
| `0.5`  | current — ~20° tilt, disk visible as ellipse |
| `1.2`  | top-down — disk fills the frame as a full circle |

---

## Speed of rotation

The disk spins via a time-driven angle in the spiral UV formula:

```glsl
vec2 dUV = rot2(radial * 4.27 - uTime * 0.11) * rp.xz * 2.0;
```

- `0.11` — disk rotation speed (increase to spin faster, set to `0.0` to freeze)
- `4.27` — spiral tightness (higher = more wound-up streaks)

There is also a slower drift applied to the FBM texture:

```glsl
float n1 = fbm(dUV + vec2(uTime * 0.05, 0.0)) * 2.0;
float n2 = fbm(dUV * 1.003 + vec2(0.0, uTime * 0.04)) * 2.0;
```

Reducing `0.05` and `0.04` slows the inner texture crawl.

---

## Ambient glow (bloom substitute)

A soft halo is added in screen-space after the march to simulate post-process bloom:

```glsl
float halo = exp(-rho * 2.8) * 0.12;
col += vec3(0.0, 0.10, 0.52) * halo;
```

- `2.8` — falloff radius (lower = wider glow)
- `0.12` — glow intensity
- The `vec3` colour should match your `hot` palette colour

---

## Performance

| Setting | GPU cost |
|---------|----------|
| `STEPS 96` (default) | ~8–12 ms/frame on integrated GPU |
| `STEPS 48` | ~4–6 ms/frame — good for mobile or lower-end hardware |
| `pixelRatio` capped at 2 | already applied in the component |

If you embed the black hole at less than full-screen, pass explicit dimensions via the `style` prop instead of relying on `100%`:

```tsx
<BlackHole style={{ width: '600px', height: '600px' }} />
```

---

## Using it in production pages

```tsx
import BlackHole from '@/components/BlackHole'

// Full-screen hero background
<div className="relative w-screen h-screen">
  <BlackHole className="absolute inset-0" />
  <div className="relative z-10">  {/* your content on top */}
    <h1>Your headline</h1>
  </div>
</div>
```

The canvas has `alpha: true` so it composites cleanly over any background colour.


export const clamp01 = (x: number) => x < 0 ? 0 : x > 1 ? 1 : x

export const clamp = (x: number, min = 0, max = 1) => x < min ? min : x > max ? max : x

export const lerp = (a: number, b: number, t: number) => a + (b - a) * clamp01(t)

export const lerpUnclamped = (a: number, b: number, t: number) => a + (b - a) * t

export const inverseLerp = (a: number, b: number, t: number) => clamp01((t - a) / (b - a))

export const inverseLerpUnclamped = (a: number, b: number, t: number) => (t - a) / (b - a)

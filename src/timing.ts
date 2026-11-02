export const FPS = 30;

// Scene lengths in frames at 30 fps.
export const T = {
  title: 120,
  arch: 300,
  read: 480,
  approve: 600,
  gate: 420,
  caps: 330,
  outro: 210,
} as const;

export const TOTAL = Object.values(T).reduce((a, b) => a + b, 0);

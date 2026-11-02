import { loadFont } from '@remotion/google-fonts/DMSans';

// Light-theme tokens follow One's DESIGN.md: warm paper neutrals, one clay accent,
// color-as-meaning for apps and approvals.
export const C = {
  page: '#faf9f5',
  backdrop: '#e9e6dc',
  sidebar: '#f3f2ec',
  raised: '#ffffff',
  bubble: '#efede6',
  hover: '#ebe9e1',
  active: '#e4e2d9',
  ink: '#1f1e1d',
  muted: '#6b6860',
  faint: '#9a968c',
  line: '#e6e3da',
  lineStrong: '#d5d1c5',
  accent: '#c96442',
  propose: '#3366c4',
  proposeSoft: '#e8eefb',
  write: '#b4382a',
  writeSoft: '#fbeae7',
  ok: '#2f8f5b',
  okSoft: '#e6f3ec',
} as const;

export const APP = {
  networth: '#2f8f5b',
  feedoverflow: '#d9822b',
  health: '#cf4f73',
  daylog: '#1f9a94',
  web: '#4f5fa8',
} as const;

const { fontFamily: dmSans } = loadFont('normal', {
  weights: ['400', '500', '600'],
  subsets: ['latin'],
});

// CJK glyphs come from macOS system faces, so render on a Mac.
export const SANS = `${dmSans}, "PingFang SC", "Hiragino Sans GB", sans-serif`;
export const SERIF = `"Noto Serif SC", "Songti SC", "STSong", serif`;
export const MONO = `"SF Mono", Menlo, "Fira Mono", monospace`;

import { loadFont } from '@remotion/google-fonts/DMSans';

// Tokens follow One's published design tokens: white surfaces, black at low alpha for text,
// lines and states, one clay accent, color-as-meaning for apps and approvals.
export const C = {
  page: '#ffffff',
  backdrop: '#ececec', // video only: behind the recreated window
  sidebar: '#fafafa',
  raised: '#ffffff',
  well: '#f3f3f3',
  bubble: 'rgba(20,20,20,.05)',
  hover: 'rgba(0,0,0,.05)',
  active: 'rgba(0,0,0,.1)',
  ink: 'rgba(0,0,0,.9)',
  inkSolid: '#1a1a1a', // ink as a fill: the toast and the cursor must not show what is behind them
  muted: 'rgba(0,0,0,.6)',
  faint: 'rgba(0,0,0,.47)',
  line: 'rgba(0,0,0,.08)',
  lineStrong: 'rgba(0,0,0,.16)',
  shadow: 'rgba(0,0,0,.12)',
  accent: '#c6613f',
  accentTint: 'rgba(198,97,63,.04)',
  propose: '#3366c4',
  proposeSoft: '#eaf0fa',
  write: '#b4382a',
  writeSoft: '#fbecea',
  ok: '#2b7a55',
  okSoft: '#e6f2ec',
} as const;

export const APP = {
  networth: '#2b7a55',
  feedoverflow: '#c2571a',
  health: '#c23a5e',
  daylog: '#2f7ea3',
  email: '#9a3f8c',
  yfinance: '#6b7a1f',
  weather: '#16897f',
  polymarket: '#7b52c7',
  'deploy-ops': '#4a6670',
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

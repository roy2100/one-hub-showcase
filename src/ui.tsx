import React from 'react';
import { useCurrentFrame } from 'remotion';
import { prog } from './anim';
import { APP, C, MONO, SANS, SERIF } from './theme';

export const STAGE_W = 1200;
export const STAGE_H = 620;
export const SCALE = 1.5;
const SIDE_W = 260;
const HEADER_H = 52;
const COLUMN_W = 720;
const COMPOSER_H = 84;
const COMPOSER_TOP = STAGE_H - 16 - COMPOSER_H;
export const DOCK_PAD = STAGE_H - COMPOSER_TOP + 16;
export const PANEL_CENTER = { x: 26, y: 26 };
export const MCP_CENTER = { x: STAGE_W - 40, y: 26 };
export const FOOTER_CENTER = { x: SIDE_W - 24, y: STAGE_H - 24 };
const columnLeft = (collapsed: number) => (STAGE_W + SIDE_W * (1 - collapsed) - COLUMN_W) / 2;
const floatShadow = `0 1px 2px rgba(0,0,0,.04), 0 6px 24px -8px ${C.shadow}`;

export type AppName = keyof typeof APP;

// Synthetic connection details for the animation, never read from a live conversation.
const CONNECTIONS = [
  { app: 'networth', tools: 12, readOnly: false },
  { app: 'feedoverflow', tools: 8, readOnly: false },
  { app: 'health', tools: 9, readOnly: false },
  { app: 'daylog', tools: 7, readOnly: false },
  { app: 'email', tools: 4, readOnly: true },
  { app: 'yfinance', tools: 15, readOnly: true },
  { app: 'weather', tools: 17, readOnly: true },
  { app: 'polymarket', tools: 7, readOnly: true },
  { app: 'deploy-ops', tools: 3, readOnly: true },
] as const;

/** A standalone animated recreation; no private application components are imported. */
export const Stage: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div style={{
    position: 'absolute', left: (1920 - STAGE_W * SCALE) / 2, top: 40,
    width: STAGE_W, height: STAGE_H, transform: `scale(${SCALE})`, transformOrigin: 'top left',
    borderRadius: 14, overflow: 'hidden', background: C.page,
    boxShadow: '0 24px 80px rgba(0,0,0,.16), 0 0 0 1px rgba(0,0,0,.08)',
    fontFamily: SANS, color: C.ink,
  }}>{children}</div>
);

export const AppDot: React.FC<{ app: AppName; size?: number }> = ({ app, size = 7 }) => (
  <span style={{ display: 'inline-block', width: size, height: size, borderRadius: size, background: APP[app], flexShrink: 0 }} />
);

const ICONS = {
  panel: 'M8 3v18M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z',
  blocks: 'M3 12h9v9H3zM12 12h9v9h-9zM3 3h9v9H3zM16 2l6 6-6 6-6-6z',
  plus: 'M12 5v14M5 12h14',
  bulb: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z',
  calendar: 'M8 2v4M16 2v4M3 10h10M12 21H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M16 16v3l2 1M22 18a5 5 0 1 1-10 0 5 5 0 0 1 10 0z',
  folder: 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
  sliders: 'M4 6h16M4 12h16M4 18h16M8 3v6M16 9v6M10 15v6',
  settings: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8M9 3l-1 3-3 1v3l-2 2 2 2v3l3 1 1 3h6l1-3 3-1v-3l2-2-2-2V7l-3-1-1-3z',
  shield: 'M12 3l8 4v6c0 4-8 8-8 8s-8-4-8-8V7zM8 12l3 3 5-6',
  chevron: 'M9 6l6 6-6 6',
  down: 'M6 9l6 6 6-6',
  clip: 'M21 11l-9 9a6 6 0 0 1-8-8L14 2a4 4 0 0 1 6 6L10 18a2 2 0 0 1-3-3l9-9',
  arrow: 'M12 19V5M5 12l7-7 7 7',
  stop: 'M6 6h12v12H6z',
  copy: 'M9 9h12v12H9zM5 15H3V3h12v2',
  check: 'M5 12l4 4L19 6',
} as const;

const Icon: React.FC<{
  name: keyof typeof ICONS;
  size?: number;
  style?: React.CSSProperties;
}> = ({ name, size = 16, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, ...style }}>
    <path d={ICONS[name]} />
  </svg>
);

const NavRow: React.FC<{ icon: keyof typeof ICONS; label: string }> = ({ icon, label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 32, padding: '0 10px', fontSize: 14 }}>
    <Icon name={icon} />{label}
  </div>
);

const ConvRow: React.FC<{ label: string; active?: boolean }> = ({ label, active }) => (
  <div style={{
    padding: '0 10px', height: 32, lineHeight: '32px', borderRadius: 8, fontSize: 14,
    background: active ? C.active : 'transparent', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
  }}>{label}</div>
);

const GroupLabel: React.FC<{ children: string }> = ({ children }) => (
  <div style={{ marginTop: 16, padding: '0 10px 4px', fontSize: 12, color: C.muted }}>{children}</div>
);

const Sidebar: React.FC<{ title: string; collapsed: number; footerMenu: number }> = ({ title, collapsed, footerMenu }) => (
  <>
    <div style={{ position: 'absolute', inset: '0 auto 0 0', width: SIDE_W * (1 - collapsed), overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: '0 auto 0 0', width: SIDE_W, boxSizing: 'border-box',
        background: C.sidebar, borderRight: `1px solid ${C.line}`, display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ height: HEADER_H, boxSizing: 'border-box', borderBottom: `1px solid ${C.line}`, display: 'flex', alignItems: 'center', paddingLeft: 50, flexShrink: 0 }}>
          <span style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 22 }}>One</span>
        </div>
        <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', padding: '8px 10px 0', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <NavRow icon="plus" label="新对话" />
          <NavRow icon="bulb" label="灵感" />
          <NavRow icon="calendar" label="定时任务" />
          <NavRow icon="folder" label="文件" />
          <GroupLabel>今天</GroupLabel>
          <ConvRow label={title} active />
          <ConvRow label="整理本周周报" />
          <ConvRow label="沙箱：画一张趋势图" />
          <GroupLabel>昨天</GroupLabel>
          <ConvRow label="读完《本地优先》的要点" />
          <ConvRow label="每周日晚的阅读汇总" />
        </div>
        <div style={{ height: 44, padding: '0 10px 0 20px', borderTop: `1px solid ${C.line}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <span style={{ color: C.faint, fontSize: 12, fontVariantNumeric: 'tabular-nums' }}>v202611130900</span>
          <span style={{ width: 28, height: 28, display: 'grid', placeItems: 'center', borderRadius: 8, color: C.muted, background: footerMenu > 0 ? C.hover : undefined }}>
            <Icon name="sliders" size={15} />
          </span>
        </div>
      </div>
    </div>
    <div style={{ position: 'absolute', left: 10, top: 10, width: 32, height: 32, display: 'grid', placeItems: 'center', color: C.muted, zIndex: 8 }}>
      <Icon name="panel" size={18} />
    </div>
    {footerMenu > 0 && (
      <div style={{
        position: 'absolute', left: SIDE_W - 198, bottom: 50, width: 188, padding: 4, boxSizing: 'border-box',
        background: C.raised, border: `1px solid ${C.line}`, borderRadius: 12, boxShadow: floatShadow,
        opacity: footerMenu, transform: `scale(${0.97 + 0.03 * footerMenu})`, transformOrigin: 'bottom right', zIndex: 9,
      }}>
        <NavRow icon="settings" label="设置" />
        <NavRow icon="shield" label="审计日志" />
      </div>
    )}
  </>
);

const McpPanel: React.FC<{ p: number }> = ({ p }) => (
  <div style={{
    position: 'absolute', right: 24, top: HEADER_H + 6, width: 320, padding: '10px 14px 12px', boxSizing: 'border-box',
    background: C.raised, border: `1px solid ${C.line}`, borderRadius: 12, boxShadow: floatShadow,
    opacity: p, transform: `scale(${0.97 + 0.03 * p})`, transformOrigin: 'top right', zIndex: 9,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 28 }}>
      <span style={{ fontSize: 14, fontWeight: 500 }}>已连接的应用</span>
      <span style={{ width: 30, fontSize: 12, color: C.faint, textAlign: 'center' }}>只读</span>
    </div>
    {CONNECTIONS.map(({ app, tools, readOnly }) => (
      <div key={app} style={{ display: 'grid', gridTemplateColumns: '7px auto 1fr 30px', alignItems: 'center', gap: 8, height: 32, fontSize: 13 }}>
        <AppDot app={app} />
        <span style={{ fontWeight: 500 }}>{app}</span>
        <span style={{ color: C.faint, fontSize: 12 }}>{tools} 个工具</span>
        <span style={{ width: 30, height: 18, borderRadius: 18, background: readOnly ? C.accent : C.lineStrong, position: 'relative' }}>
          <span style={{ position: 'absolute', top: 2, left: readOnly ? 14 : 2, width: 14, height: 14, borderRadius: 14, background: C.raised }} />
        </span>
      </div>
    ))}
    <div style={{ margin: '6px -14px 0', padding: '10px 14px 0', borderTop: `1px solid ${C.line}`, fontSize: 12, lineHeight: 1.5, color: C.faint }}>
      连接状态属于当前对话；只读开关对所有对话生效。
    </div>
  </div>
);

const TopBar: React.FC<{ title: string; collapsed: number; mcpPanel: number }> = ({ title, collapsed, mcpPanel }) => (
  <>
    <div style={{
      position: 'absolute', left: SIDE_W * (1 - collapsed), right: 0, top: 0, height: HEADER_H,
      borderBottom: `1px solid ${C.line}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: `0 24px 0 ${24 + 30 * collapsed}px`, boxSizing: 'border-box', background: C.page, zIndex: 2,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, fontWeight: 500 }}>
        {title}<Icon name="down" size={14} style={{ color: C.muted }} />
      </div>
      <div style={{ display: 'grid', placeItems: 'center', width: 32, height: 28, color: C.muted, borderRadius: 8, background: mcpPanel > 0 ? C.hover : undefined }}>
        <Icon name="blocks" size={15} />
      </div>
    </div>
    {mcpPanel > 0 && <McpPanel p={mcpPanel} />}
  </>
);

/** Collapse changes the main column and dock together; the sidebar itself never reflows. */
export const ChatWindow: React.FC<{
  title: string;
  bottomPad: number;
  collapsed?: number;
  mcpPanel?: number;
  footerMenu?: number;
  children?: React.ReactNode;
}> = ({ title, bottomPad, collapsed = 0, mcpPanel = 0, footerMenu = 0, children }) => (
  <>
    <Sidebar title={title} collapsed={collapsed} footerMenu={footerMenu} />
    <TopBar title={title} collapsed={collapsed} mcpPanel={mcpPanel} />
    <div style={{
      position: 'absolute', left: SIDE_W * (1 - collapsed), right: 0, top: HEADER_H, bottom: 0,
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center',
      paddingBottom: bottomPad, boxSizing: 'border-box', overflow: 'hidden',
    }}>
      <div style={{ width: COLUMN_W, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 24 }}>{children}</div>
    </div>
  </>
);

export const Composer: React.FC<{ text: string; collapsed?: number; running?: boolean }> = ({ text, collapsed = 0, running = false }) => (
  <div style={{
    position: 'absolute', left: columnLeft(collapsed), width: COLUMN_W, top: COMPOSER_TOP, height: COMPOSER_H,
    boxSizing: 'border-box', background: C.raised, border: `1px solid ${C.lineStrong}`, borderRadius: 18,
    boxShadow: floatShadow, padding: '12px 10px 8px 16px', zIndex: 3,
  }}>
    <div style={{ height: 26, fontSize: 16, lineHeight: '26px', color: text ? C.ink : C.faint }}>
      {text || (running ? '补充一句，会排在当前回复之后' : '问点什么，Enter 发送，Shift+Enter 换行')}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, height: 32 }}>
      <span style={{ display: 'grid', placeItems: 'center', width: 32, height: 32, marginLeft: -8, marginRight: 'auto', color: C.muted }}>
        <Icon name="clip" />
      </span>
      {running && <span style={{ display: 'grid', placeItems: 'center', width: 32, height: 32, boxSizing: 'border-box', border: `1px solid ${C.lineStrong}`, borderRadius: 8 }}><Icon name="stop" /></span>}
      <span style={{ width: 32, height: 32, borderRadius: 8, background: C.accent, opacity: text ? 1 : 0.4, color: C.raised, display: 'grid', placeItems: 'center' }}>
        <Icon name="arrow" />
      </span>
    </div>
  </div>
);

export const UserBubble: React.FC<{ children: string }> = ({ children }) => (
  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
    <div style={{ maxWidth: '80%', background: C.bubble, borderRadius: 18, padding: '10px 16px', fontSize: 15, lineHeight: 1.6 }}>{children}</div>
  </div>
);

export const Prose: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div style={{ fontFamily: SERIF, fontSize: 16, lineHeight: 1.85, color: C.ink }}>{children}</div>
);

export const AnswerCopy: React.FC = () => (
  <div style={{ marginTop: 6, marginLeft: -7, width: 28, height: 28, display: 'grid', placeItems: 'center', color: C.muted }}>
    <Icon name="copy" size={14} />
  </div>
);

export type RowState = 'running' | 'done' | 'denied';

/** Focus view: a descriptive label, shimmer while running, and a trailing chevron. */
export const ActivityRow: React.FC<{
  state: RowState;
  app: AppName;
  tool: string;
  expand?: number;
  doneLabel: string;
}> = ({ state, app, tool, expand = 0, doneLabel }) => {
  const f = useCurrentFrame();
  const verb = /^(get|list|search|read|query|find|fetch)_/.test(tool) ? '查询' : '调用';
  const live = state === 'running';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 0', fontSize: 14, color: C.muted }}>
      <span style={live ? {
        backgroundImage: `linear-gradient(90deg, ${C.faint} 35%, ${C.ink} 50%, ${C.faint} 65%)`,
        backgroundSize: '300% 100%', backgroundPosition: `${100 * (1 - (f % 66) / 66)}% 0`,
        backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent',
      } : undefined}>{live ? `正在${verb} ${app}` : doneLabel || `${verb}了 ${app}`}</span>
      {state === 'denied' && <span style={{ color: C.write }}>1 个出错</span>}
      <Icon name="chevron" size={14} style={{ transform: `rotate(${expand * 90}deg)` }} />
    </div>
  );
};

/** Expanded activity: app/tool heading and separate argument/output wells under an indent. */
export const ToolCard: React.FC<{ name: string; args: string; output: string; p: number }> = ({ name, args, output, p }) => {
  const [, app, tool] = name.split('__') as [string, AppName, string];
  return (
    <div style={{ height: 180 * p, overflow: 'hidden', opacity: p, marginLeft: 6, paddingLeft: 12, borderLeft: `1px solid ${C.line}`, boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: C.muted, height: 24 }}>
        <Icon name="chevron" size={14} style={{ transform: 'rotate(90deg)' }} />
        <AppDot app={app} /><span style={{ fontWeight: 500, color: C.ink }}>{app}</span>
        <span style={{ fontFamily: MONO, fontSize: 12.5 }}>{tool}</span><Icon name="check" size={14} />
      </div>
      <div style={{ background: C.raised, border: `1px solid ${C.line}`, borderRadius: 12, padding: 12, display: 'grid', gap: 8, marginTop: 4 }}>
        {[args, output].map((text, i) => <div key={i} style={{ background: C.well, borderRadius: 8, padding: '10px 12px', color: C.ink, fontFamily: MONO, fontSize: 12.5, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{text}</div>)}
      </div>
    </div>
  );
};

export const APPROVAL_H = 194;
const APPROVAL_TOP = COMPOSER_TOP - 10 - APPROVAL_H;
const ACTION_TOP = 152;
const BUTTON_W = 60;
const BUTTON_H = 32;
const ALLOW_LEFT = 16;
const DENY_LEFT = ALLOW_LEFT + BUTTON_W + 8;
// Both the card and cursor targets derive from the same button geometry.
export const APPROVE_CENTER = { x: columnLeft(0) + ALLOW_LEFT + BUTTON_W / 2, y: APPROVAL_TOP + ACTION_TOP + BUTTON_H / 2 };
export const DENY_CENTER = { x: columnLeft(0) + DENY_LEFT + BUTTON_W / 2, y: APPROVAL_TOP + ACTION_TOP + BUTTON_H / 2 };

const Btn: React.FC<{ left: number; label: string; pressed: boolean; primary: boolean }> = ({ left, label, pressed, primary }) => (
  <div style={{
    position: 'absolute', left, top: ACTION_TOP, width: BUTTON_W, height: BUTTON_H, borderRadius: 8, boxSizing: 'border-box',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 500,
    background: primary ? C.propose : C.raised, color: primary ? C.raised : C.ink,
    border: primary ? '1px solid transparent' : `1px solid ${C.lineStrong}`,
    transform: pressed ? 'scale(.94)' : undefined,
  }}>{label}</div>
);

/** Current approval layout: badge, sentence, full JSON, then Allow and Deny on the left. */
export const ApprovalCard: React.FC<{ p: number; pressed?: 'deny' | 'approve' | null }> = ({ p, pressed = null }) => (
  <div style={{
    position: 'absolute', left: columnLeft(0), top: APPROVAL_TOP, width: COLUMN_W, height: APPROVAL_H,
    opacity: p, transform: `translateY(${(1 - p) * 16}px)`, boxSizing: 'border-box', background: C.raised,
    border: `1px solid color-mix(in srgb, ${C.propose} 45%, ${C.line})`, borderRadius: 18, boxShadow: floatShadow, zIndex: 3,
  }}>
    <div style={{ position: 'absolute', left: 16, top: 14, display: 'flex', alignItems: 'center', gap: 10, fontSize: 15 }}>
      <span style={{ fontSize: 12, color: C.propose, background: C.proposeSoft, borderRadius: 20, padding: '1px 8px', fontWeight: 600 }}>提议</span>
      <span style={{ fontWeight: 500 }}>One 想在 <strong style={{ color: APP.health, fontWeight: 600 }}>health</strong> 里提交一条提议</span>
      <span style={{ fontFamily: MONO, fontSize: 12.5, color: C.muted }}>add_todo</span>
    </div>
    <pre style={{
      position: 'absolute', left: 16, right: 16, top: 44, height: 96, margin: 0, boxSizing: 'border-box',
      overflow: 'auto', background: C.proposeSoft, borderRadius: 12, padding: '10px 12px',
      fontFamily: MONO, fontSize: 12.5, lineHeight: 1.5, color: C.ink,
    }}>{'{\n  "title": "预约年度体检",\n  "category": "other"\n}'}</pre>
    <Btn left={ALLOW_LEFT} label="允许" pressed={pressed === 'approve'} primary />
    <Btn left={DENY_LEFT} label="拒绝" pressed={pressed === 'deny'} primary={false} />
  </div>
);

/** Mouse pointer; x/y are stage coordinates and click drives a short ripple. */
export const Cursor: React.FC<{ x: number; y: number; click?: number; opacity?: number }> = ({ x, y, click = 0, opacity = 1 }) => (
  <div style={{ position: 'absolute', left: x, top: y, zIndex: 10, opacity, pointerEvents: 'none' }}>
    {click > 0 && click < 1 && <div style={{ position: 'absolute', left: -16, top: -16, width: 32, height: 32, borderRadius: 32, border: `2px solid ${C.ink}`, opacity: 0.4 * (1 - click), transform: `scale(${0.4 + click * 1.2})` }} />}
    <svg width={22} height={22} viewBox="0 0 24 24" style={{ transform: 'translate(-3px,-2px)' }}>
      <path d="M4 3l7 17 2.4-7.2L21 10z" fill={C.inkSolid} stroke={C.raised} strokeWidth={1.6} strokeLinejoin="round" />
    </svg>
  </div>
);

/** A frame-based click sequence, also used for sidebar and popover actions. */
export const PointerAction: React.FC<{
  at: number;
  until: number;
  from: { x: number; y: number };
  to: { x: number; y: number };
}> = ({ at, until, from, to }) => {
  const f = useCurrentFrame();
  if (f < at - 18 || f >= until) return null;
  const move = prog(f, at - 16, at - 2);
  return <Cursor x={from.x + (to.x - from.x) * move} y={from.y + (to.y - from.y) * move}
    click={prog(f, at, at + 12)} opacity={prog(f, at - 18, at - 12) * (1 - prog(f, until - 8, until))} />;
};

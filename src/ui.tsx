import React from 'react';
import { useCurrentFrame } from 'remotion';
import { prog } from './anim';
import { APP, C, MONO, SANS, SERIF } from './theme';

export const STAGE_W = 1200;
export const STAGE_H = 620;
export const SCALE = 1.5;

export type AppName = keyof typeof APP;

/** A 1200x620 canvas scaled 1.5x and centered, holding a recreation of One's UI. */
export const Stage: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      position: 'absolute',
      left: (1920 - STAGE_W * SCALE) / 2,
      top: 40,
      width: STAGE_W,
      height: STAGE_H,
      transform: `scale(${SCALE})`,
      transformOrigin: 'top left',
      borderRadius: 14,
      overflow: 'hidden',
      background: C.page,
      boxShadow: '0 24px 80px rgba(31,30,29,.18), 0 0 0 1px rgba(31,30,29,.08)',
      fontFamily: SANS,
      color: C.ink,
    }}
  >
    {children}
  </div>
);

export const AppDot: React.FC<{ app: AppName; size?: number }> = ({ app, size = 7 }) => (
  <span
    style={{
      display: 'inline-block',
      width: size,
      height: size,
      borderRadius: size,
      background: APP[app],
      flexShrink: 0,
    }}
  />
);

const Icon: React.FC<{ d: string }> = ({ d }) => (
  <svg
    width={15}
    height={15}
    viewBox="0 0 24 24"
    fill="none"
    stroke={C.muted}
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

const NavRow: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 12px', fontSize: 14, color: C.ink }}>
    {icon}
    {label}
  </div>
);

const ConvRow: React.FC<{ label: string; active?: boolean }> = ({ label, active }) => (
  <div
    style={{
      padding: '6px 12px',
      margin: '1px 0',
      borderRadius: 8,
      fontSize: 14,
      background: active ? C.active : 'transparent',
      color: C.ink,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }}
  >
    {label}
  </div>
);

const GroupLabel: React.FC<{ children: string }> = ({ children }) => (
  <div style={{ padding: '14px 12px 4px', fontSize: 12, color: C.faint }}>{children}</div>
);

const Sidebar: React.FC<{ title: string }> = ({ title }) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 260,
      background: C.sidebar,
      padding: '18px 10px',
      boxSizing: 'border-box',
    }}
  >
    <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 22, padding: '0 12px 14px' }}>One</div>
    <NavRow icon={<Icon d="M12 5v14M5 12h14" />} label="新对话" />
    <NavRow
      icon={<Icon d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z" />}
      label="灵感"
    />
    <NavRow icon={<Icon d="M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />} label="定时任务" />
    <NavRow
      icon={<Icon d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />}
      label="文件"
    />
    <GroupLabel>今天</GroupLabel>
    <ConvRow label={title} active />
    <ConvRow label="整理本周周报" />
    <ConvRow label="沙箱：画一张趋势图" />
    <GroupLabel>昨天</GroupLabel>
    <ConvRow label="读完《本地优先》的要点" />
    <ConvRow label="每周日晚的阅读汇总" />
    <div
      style={{
        position: 'absolute',
        left: 10,
        right: 10,
        bottom: 14,
        borderTop: `1px solid ${C.line}`,
        paddingTop: 10,
        fontSize: 14,
        color: C.muted,
      }}
    >
      <div style={{ padding: '4px 12px' }}>设置</div>
      <div style={{ padding: '4px 12px' }}>审计日志</div>
    </div>
  </div>
);

const TopBar: React.FC<{ title: string }> = ({ title }) => (
  <div
    style={{
      position: 'absolute',
      left: 260,
      right: 0,
      top: 0,
      height: 48,
      borderBottom: `1px solid ${C.line}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      boxSizing: 'border-box',
      background: C.page,
      zIndex: 2,
    }}
  >
    <div style={{ fontSize: 14, fontWeight: 500 }}>{title}</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: C.muted }}>
      {(['networth', 'feedoverflow', 'health', 'daylog'] as const).map((a) => (
        <AppDot key={a} app={a} />
      ))}
      <span style={{ marginLeft: 4 }}>4/4</span>
    </div>
  </div>
);

/** Sidebar + top bar + a bottom-anchored transcript column. */
export const ChatWindow: React.FC<{
  title: string;
  bottomPad: number;
  children?: React.ReactNode;
}> = ({ title, bottomPad, children }) => (
  <>
    <Sidebar title={title} />
    <TopBar title={title} />
    <div
      style={{
        position: 'absolute',
        left: 260,
        right: 0,
        top: 48,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: bottomPad,
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <div style={{ width: 720, display: 'flex', flexDirection: 'column', gap: 24 }}>{children}</div>
    </div>
  </>
);

export const Composer: React.FC<{ text: string }> = ({ text }) => (
  <div
    style={{
      position: 'absolute',
      left: 370,
      width: 720,
      top: 532,
      height: 64,
      boxSizing: 'border-box',
      background: C.raised,
      border: `1px solid ${C.lineStrong}`,
      borderRadius: 18,
      boxShadow: '0 6px 24px rgba(31,30,29,.08)',
      padding: '0 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: 15,
      zIndex: 3,
    }}
  >
    <span style={{ color: text ? C.ink : C.faint }}>{text || '问点什么，或让我帮你处理…'}</span>
    <span
      style={{
        width: 32,
        height: 32,
        borderRadius: 10,
        background: text ? C.accent : C.line,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </span>
  </div>
);

export const UserBubble: React.FC<{ children: string }> = ({ children }) => (
  <div style={{ alignSelf: 'flex-end', maxWidth: '80%', background: C.bubble, borderRadius: 18, padding: '10px 16px', fontSize: 15 }}>
    {children}
  </div>
);

export const Prose: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div style={{ fontFamily: SERIF, fontSize: 16, lineHeight: 1.85, color: C.ink }}>{children}</div>
);

const Spinner: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <span
      style={{
        display: 'inline-block',
        width: 12,
        height: 12,
        borderRadius: 12,
        border: `2px solid ${C.line}`,
        borderTopColor: C.accent,
        transform: `rotate(${f * 14}deg)`,
      }}
    />
  );
};

export type RowState = 'running' | 'done' | 'denied';

/** The folded "thinking + tool calls" row from One's Focus view. */
export const ActivityRow: React.FC<{
  state: RowState;
  app: AppName;
  tool: string;
  expand?: number; // 0 -> 1 chevron rotation
  doneLabel: string;
}> = ({ state, app, tool, expand = 0, doneLabel }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: C.muted }}>
    <svg
      width={12}
      height={12}
      viewBox="0 0 24 24"
      fill="none"
      stroke={C.faint}
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: `rotate(${expand * 90}deg)` }}
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
    <AppDot app={app} />
    {state === 'running' ? (
      <>
        <span>
          正在调用 {app} <span style={{ fontFamily: MONO, fontSize: 12.5 }}>{tool}</span>
        </span>
        <Spinner />
      </>
    ) : state === 'denied' ? (
      <>
        <span style={{ fontFamily: MONO, fontSize: 12.5 }}>{tool}</span>
        <span style={{ color: C.write }}>已拒绝，未执行</span>
      </>
    ) : (
      <>
        <span>{doneLabel}</span>
        <span style={{ color: C.ok }}>✓</span>
      </>
    )}
  </div>
);

/** Expanded tool call: arguments and output wells. */
export const ToolCard: React.FC<{ name: string; args: string; output: string; p: number }> = ({
  name,
  args,
  output,
  p,
}) => (
  <div style={{ height: 150 * p, overflow: 'hidden', opacity: p, marginLeft: 20 }}>
    <div
      style={{
        background: C.raised,
        border: `1px solid ${C.line}`,
        borderRadius: 12,
        padding: 12,
        fontSize: 12.5,
        fontFamily: MONO,
        height: 138,
        boxSizing: 'border-box',
      }}
    >
      <div style={{ color: C.ink, marginBottom: 8 }}>{name}</div>
      <div style={{ background: C.sidebar, borderRadius: 8, padding: '6px 10px', color: C.muted, marginBottom: 6 }}>
        {args}
      </div>
      <div style={{ background: C.sidebar, borderRadius: 8, padding: '6px 10px', color: C.muted, lineHeight: 1.5 }}>
        {output}
      </div>
    </div>
  </div>
);

export const APPROVAL_W = 720;
export const APPROVAL_H = 176;
export const APPROVAL_TOP = 344;
export const APPROVAL_LEFT = 370;
// Button centers in stage coordinates, so the cursor can aim at them exactly.
export const DENY_CENTER = { x: APPROVAL_LEFT + 520 + 42, y: APPROVAL_TOP + 124 + 17 };
export const APPROVE_CENTER = { x: APPROVAL_LEFT + 624 + 42, y: APPROVAL_TOP + 124 + 17 };

const Btn: React.FC<{ left: number; label: string; pressed: boolean; primary: boolean }> = ({
  left,
  label,
  pressed,
  primary,
}) => (
  <div
    style={{
      position: 'absolute',
      left,
      top: 124,
      width: 84,
      height: 34,
      borderRadius: 8,
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 14,
      fontWeight: 500,
      background: primary ? C.propose : C.raised,
      color: primary ? '#fff' : C.ink,
      border: primary ? 'none' : `1px solid ${C.lineStrong}`,
      transform: pressed ? 'scale(.94)' : 'none',
      filter: pressed ? 'brightness(.92)' : 'none',
    }}
  >
    {label}
  </div>
);

/** The approval card that sits in the dock above the composer. */
export const ApprovalCard: React.FC<{ p: number; pressed?: 'deny' | 'approve' | null }> = ({
  p,
  pressed = null,
}) => (
  <div
    style={{
      position: 'absolute',
      left: APPROVAL_LEFT,
      top: APPROVAL_TOP,
      width: APPROVAL_W,
      height: APPROVAL_H,
      opacity: p,
      transform: `translateY(${(1 - p) * 16}px)`,
      boxSizing: 'border-box',
      background: C.raised,
      border: `1.5px solid ${C.propose}`,
      borderRadius: 18,
      boxShadow: '0 10px 36px rgba(51,102,196,.18)',
      zIndex: 3,
    }}
  >
    <div style={{ position: 'absolute', left: 18, top: 14, display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
      <AppDot app="health" />
      <span style={{ color: APP.health, fontWeight: 600 }}>health</span>
      <span style={{ fontFamily: MONO, fontSize: 13 }}>add_todo</span>
      <span style={{ marginLeft: 6, fontSize: 12, color: C.propose, background: C.proposeSoft, borderRadius: 6, padding: '1px 8px', fontWeight: 600 }}>
        提议
      </span>
    </div>
    <div style={{ position: 'absolute', left: 18, top: 42, fontSize: 13, color: C.muted }}>
      新增一条健康待办 · 需要你批准后才会执行
    </div>
    <div
      style={{
        position: 'absolute',
        left: 16,
        top: 70,
        width: 440,
        height: 62,
        boxSizing: 'border-box',
        background: C.sidebar,
        borderRadius: 10,
        padding: '8px 12px',
        fontFamily: MONO,
        fontSize: 12.5,
        lineHeight: 1.6,
        color: C.muted,
      }}
    >
      <div>title: "预约年度体检"</div>
      <div>category: "other"</div>
    </div>
    <Btn left={520} label="拒绝" pressed={pressed === 'deny'} primary={false} />
    <Btn left={624} label="批准" pressed={pressed === 'approve'} primary />
  </div>
);

/** Mouse pointer. x/y are stage coordinates; `click` is 0 -> 1 for a ripple. */
export const Cursor: React.FC<{ x: number; y: number; click?: number; opacity?: number }> = ({
  x,
  y,
  click = 0,
  opacity = 1,
}) => (
  <div style={{ position: 'absolute', left: x, top: y, zIndex: 10, opacity, pointerEvents: 'none' }}>
    {click > 0 && click < 1 && (
      <div
        style={{
          position: 'absolute',
          left: -16,
          top: -16,
          width: 32,
          height: 32,
          borderRadius: 32,
          border: `2px solid ${C.ink}`,
          opacity: 0.4 * (1 - click),
          transform: `scale(${0.4 + click * 1.2})`,
        }}
      />
    )}
    <svg width={22} height={22} viewBox="0 0 24 24" style={{ transform: 'translate(-3px,-2px)' }}>
      <path d="M4 3l7 17 2.4-7.2L21 10z" fill={C.ink} stroke="#fff" strokeWidth={1.6} strokeLinejoin="round" />
    </svg>
  </div>
);

export const Toast: React.FC<{ at: number; text: string }> = ({ at, text }) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  const p = prog(f, at, at + 14);
  return (
    <div
      style={{
        position: 'absolute',
        right: 20,
        top: 62,
        opacity: p,
        transform: `translateY(${(1 - p) * -10}px)`,
        background: C.ink,
        color: C.page,
        fontSize: 13,
        borderRadius: 10,
        padding: '8px 14px',
        boxShadow: '0 8px 28px rgba(31,30,29,.25)',
        zIndex: 6,
      }}
    >
      {text}
    </div>
  );
};

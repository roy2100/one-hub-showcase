import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Reveal, Scene, prog } from '../anim';
import { C, MONO, SANS, SERIF } from '../theme';
import { T } from '../timing';

type NodeProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  at: number;
  title: string;
  sub?: string;
  color: string;
  fill: string;
};

const Node: React.FC<NodeProps> = ({ x, y, w, h, at, title, sub, color, fill }) => (
  <Reveal at={at} style={{ position: 'absolute', left: x, top: y, width: w, height: h }}>
    <div
      style={{
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        border: `2.5px solid ${color}`,
        background: fill,
        borderRadius: 18,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        padding: '0 14px',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 26, fontWeight: 600, color }}>{title}</div>
      {sub && <div style={{ fontSize: 19, color: C.muted }}>{sub}</div>}
    </div>
  </Reveal>
);

const Edge: React.FC<{ d: string; from: number; to: number; color: string }> = ({ d, from, to, color }) => {
  const f = useCurrentFrame();
  return (
    <path
      d={d}
      pathLength={1}
      fill="none"
      stroke={color}
      strokeWidth={3}
      strokeDasharray={1}
      strokeDashoffset={1 - prog(f, from, to)}
      strokeLinecap="round"
    />
  );
};

const Chip: React.FC<{ at: number; text: string }> = ({ at, text }) => (
  <Reveal at={at} y={14}>
    <div
      style={{
        background: C.raised,
        border: `1.5px solid ${C.lineStrong}`,
        borderRadius: 14,
        padding: '14px 22px',
        fontSize: 24,
        lineHeight: 1.4,
        maxWidth: 520,
      }}
    >
      {text}
    </div>
  </Reveal>
);

export const Gate: React.FC = () => (
  <Scene duration={T.gate}>
    <div style={{ position: 'absolute', inset: 0, fontFamily: SANS, color: C.ink }}>
      <Reveal at={4} style={{ position: 'absolute', top: 70, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ fontFamily: SERIF, fontSize: 58, fontWeight: 500 }}>读可以自动，写必须点头</div>
      </Reveal>

      <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0 }}>
        <Edge d="M380 440 L520 440" from={24} to={44} color={C.lineStrong} />
        <Edge d="M800 440 C890 440 890 305 980 305" from={74} to={96} color={C.ok} />
        <Edge d="M800 440 C890 440 890 565 980 565" from={96} to={118} color={C.propose} />
        <Edge d="M1260 565 C1350 565 1350 525 1440 525" from={150} to={172} color={C.ok} />
        <Edge d="M1260 565 C1350 565 1350 665 1440 665" from={172} to={194} color={C.write} />
      </svg>

      <Node x={100} y={395} w={280} h={90} at={10} title="工具调用" sub="agent 发起" color={C.ink} fill={C.raised} />
      <Node x={520} y={395} w={280} h={90} at={50} title="策略匹配" sub="policy.json" color={C.ink} fill={C.raised} />
      <Node x={980} y={260} w={280} h={90} at={96} title="read" sub="直接执行" color={C.ok} fill={C.okSoft} />
      <Node
        x={980}
        y={520}
        w={280}
        h={90}
        at={118}
        title="propose / write"
        sub="未登记的工具默认按 write"
        color={C.propose}
        fill={C.proposeSoft}
      />
      <Node x={1440} y={480} w={380} h={90} at={172} title="你点击「批准」" sub="才会执行" color={C.ok} fill={C.okSoft} />
      <Node
        x={1440}
        y={620}
        w={380}
        h={90}
        at={194}
        title="拒绝 · 中断 · 断线"
        sub="一律阻断，绝不挂起放行"
        color={C.write}
        fill={C.writeSoft}
      />

      <div
        style={{
          position: 'absolute',
          left: 100,
          right: 100,
          top: 800,
          display: 'flex',
          justifyContent: 'center',
          gap: 28,
        }}
      >
        <Chip at={250} text="codemode 脚本里的嵌套调用也逐个拦截" />
        <Chip at={285} text="文章、网页等外部文本视为不可信，防 prompt injection" />
        <Chip at={320} text="每个决定写入追加式审计日志，永不清理" />
      </div>
      <Reveal at={360} style={{ position: 'absolute', left: 0, right: 0, bottom: 56, textAlign: 'center' }}>
        <div style={{ fontFamily: MONO, fontSize: 22, color: C.muted }}>只有显式批准才能运行非只读工具</div>
      </Reveal>
    </div>
  </Scene>
);

import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Reveal, Scene, prog } from '../anim';
import { APP, C, MONO, SANS, SERIF } from '../theme';
import { T } from '../timing';

// Four self-hosted apps (writes approved), then five read-only sources.
const MCP = [
  { app: 'networth', note: '投资组合' },
  { app: 'feedoverflow', note: 'RSS 阅读器' },
  { app: 'health', note: '健康记录' },
  { app: 'daylog', note: '个人日志' },
  { app: 'email', note: '邮箱 · IMAP' },
  { app: 'yfinance', note: '市场行情' },
  { app: 'weather', note: '天气' },
  { app: 'polymarket', note: '预测市场' },
  { app: 'deploy-ops', note: '备份与安全审计' },
] as const;

const RW = 4; // rows before the read-only group
const MCP_X = 1480;
const MCP_W = 390;
const MCP_H = 64;
const PITCH = 74;
const GROUP_GAP = 66; // room for the 只读 label between the groups
const RW_LABEL_Y = 176;
const ROW0_Y = 212;
const mcpTop = (i: number) => ROW0_Y + i * PITCH + (i >= RW ? GROUP_GAP : 0);
const RO_LABEL_Y = mcpTop(RW) - 36;
const mcpCenter = (i: number) => mcpTop(i) + MCP_H / 2;
const STAGGER = 6;

const Box: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  at: number;
  title: string;
  sub?: string;
  accent?: string;
  mono?: boolean;
}> = ({ x, y, w, h, at, title, sub, accent = C.lineStrong, mono }) => (
  <Reveal at={at} style={{ position: 'absolute', left: x, top: y, width: w, height: h }}>
    <div
      style={{
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        background: C.raised,
        border: `2px solid ${accent}`,
        borderRadius: 18,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
      }}
    >
      <div style={{ fontSize: 26, fontWeight: 600, fontFamily: mono ? MONO : SANS }}>{title}</div>
      {sub && <div style={{ fontSize: 20, color: C.muted }}>{sub}</div>}
    </div>
  </Reveal>
);

const Line: React.FC<{ d: string; from: number; to: number; color?: string }> = ({
  d,
  from,
  to,
  color = C.lineStrong,
}) => {
  const f = useCurrentFrame();
  const p = prog(f, from, to);
  return (
    <path
      d={d}
      pathLength={1}
      fill="none"
      stroke={color}
      strokeWidth={3}
      strokeDasharray={1}
      strokeDashoffset={1 - p}
      strokeLinecap="round"
    />
  );
};

export const Architecture: React.FC = () => {
  const tiles = [
    { t: 'Pi SDK', s: 'AgentSession', x: 30, y: 90 },
    { t: '审批闸门', s: 'Approval Gate', x: 370, y: 90 },
    { t: '策略', s: 'read / propose / write', x: 30, y: 230 },
    { t: 'SQLite', s: '审计 · 记忆 · 任务', x: 370, y: 230 },
  ];
  return (
    <Scene duration={T.arch}>
      <div style={{ position: 'absolute', inset: 0, fontFamily: SANS, color: C.ink }}>
        <Reveal at={4} style={{ position: 'absolute', top: 70, left: 0, right: 0, textAlign: 'center' }}>
          <div style={{ fontFamily: SERIF, fontSize: 58, fontWeight: 500 }}>Agent 只通过 MCP 认识各应用</div>
        </Reveal>

        <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0 }}>
          <Line d="M410 480 L560 480" from={30} to={55} />
          {MCP.map((_, i) => (
            <Line
              key={i}
              d={`M1280 480 C1390 480 1390 ${mcpCenter(i)} ${MCP_X} ${mcpCenter(i)}`}
              from={120 + i * STAGGER}
              to={150 + i * STAGGER}
              color={APP[MCP[i].app]}
            />
          ))}
        </svg>

        <Box x={110} y={360} w={300} h={240} at={14} title="浏览器" sub="React PWA · 对话与审批" />
        <Reveal at={60} style={{ position: 'absolute', left: 410, top: 430, width: 150, textAlign: 'center' }}>
          <div style={{ fontSize: 18, color: C.muted, fontFamily: MONO }}>WebSocket</div>
        </Reveal>

        <Reveal
          at={50}
          style={{ position: 'absolute', left: 560, top: 265, width: 720, height: 430 }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              boxSizing: 'border-box',
              border: `2px solid ${C.accent}`,
              borderRadius: 22,
              background: C.accentTint,
              position: 'relative',
            }}
          >
            <div style={{ position: 'absolute', left: 30, top: 24, fontSize: 28, fontWeight: 600 }}>
              One 服务端 <span style={{ color: C.muted, fontWeight: 400, fontSize: 22 }}>· Bun + TypeScript</span>
            </div>
          </div>
        </Reveal>
        {tiles.map((t, i) => (
          <Box
            key={t.t}
            x={560 + t.x}
            y={265 + t.y}
            w={320}
            h={110}
            at={72 + i * 10}
            title={t.t}
            sub={t.s}
          />
        ))}
        <Reveal at={118} style={{ position: 'absolute', left: 590, top: 265 + 360, width: 660 }}>
          <div style={{ fontSize: 20, color: C.muted }}>单用户登录 + TOTP · 会话文件是对话的唯一事实来源</div>
        </Reveal>

        <Reveal at={104} style={{ position: 'absolute', left: MCP_X + 4, top: RW_LABEL_Y }}>
          <div style={{ fontSize: 20, color: C.muted }}>自托管应用 · 写入需审批</div>
        </Reveal>
        <Reveal at={104 + RW * STAGGER} style={{ position: 'absolute', left: MCP_X + 4, top: RO_LABEL_Y }}>
          <div style={{ fontSize: 20, color: C.muted }}>只读数据源</div>
        </Reveal>
        {MCP.map((m, i) => (
          <Reveal
            key={m.app}
            at={110 + i * STAGGER}
            style={{ position: 'absolute', left: MCP_X, top: mcpTop(i), width: MCP_W, height: MCP_H }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                boxSizing: 'border-box',
                background: C.raised,
                border: `2px solid ${APP[m.app]}`,
                borderRadius: 14,
                padding: '0 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <span style={{ width: 12, height: 12, borderRadius: 12, background: APP[m.app], flexShrink: 0 }} />
              <span style={{ fontSize: 24, fontWeight: 600 }}>{m.app}</span>
              <span style={{ fontSize: 18, color: C.muted, marginLeft: 'auto' }}>{m.note}</span>
            </div>
          </Reveal>
        ))}
        <Reveal at={150} style={{ position: 'absolute', left: 1290, top: 420, width: 200, textAlign: 'center' }}>
          <div style={{ fontSize: 18, color: C.muted, fontFamily: MONO }}>MCP</div>
        </Reveal>

        <Reveal at={200} style={{ position: 'absolute', left: 0, right: 0, bottom: 60, textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 500 }}>
            宿主不 import 任何应用代码，也不认识它们的数据表结构
          </div>
        </Reveal>
      </div>
    </Scene>
  );
};

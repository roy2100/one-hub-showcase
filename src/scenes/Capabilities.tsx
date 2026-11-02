import React from 'react';
import { Reveal, Scene } from '../anim';
import { APP, C, SANS, SERIF } from '../theme';
import { T } from '../timing';

const CARDS = [
  { t: '长期记忆', d: '对话中自己记下长期事实；读过外部内容后，要你确认才写入', c: APP.feedoverflow },
  { t: '定时任务', d: '到点只读地跑一个问题，结果留成对话，并推送到手机', c: APP.daylog },
  { t: '离线沙箱', d: '断网、只读根文件系统、只挂载工作区，用来画图、做表、转格式', c: APP.web },
  { t: '文件工作区', d: '上传文本或 PDF；agent 只能读写这一个目录', c: APP.networth },
  { t: '联网搜索', d: '搜索自由使用；读陌生链接需要你确认', c: APP.health },
  { t: '应用只读开关', d: '每个应用可单独设为只读，写操作直接拒绝', c: C.accent },
];

export const Capabilities: React.FC = () => (
  <Scene duration={T.caps}>
    <div style={{ position: 'absolute', inset: 0, fontFamily: SANS, color: C.ink }}>
      <Reveal at={4} style={{ position: 'absolute', top: 70, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ fontFamily: SERIF, fontSize: 58, fontWeight: 500 }}>能做的事，边界都画好了</div>
      </Reveal>
      <div
        style={{
          position: 'absolute',
          left: 150,
          right: 150,
          top: 250,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 34,
        }}
      >
        {CARDS.map((c, i) => (
          <Reveal key={c.t} at={20 + i * 14} y={18}>
            <div
              style={{
                background: C.raised,
                border: `1.5px solid ${C.line}`,
                borderTop: `6px solid ${c.c}`,
                borderRadius: 18,
                padding: '30px 30px 34px',
                height: 250,
                boxSizing: 'border-box',
              }}
            >
              <div style={{ fontSize: 34, fontWeight: 600, marginBottom: 16 }}>{c.t}</div>
              <div style={{ fontSize: 24, lineHeight: 1.6, color: C.muted }}>{c.d}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </Scene>
);

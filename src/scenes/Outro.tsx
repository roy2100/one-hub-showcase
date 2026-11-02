import React from 'react';
import { Reveal, Scene } from '../anim';
import { C, MONO, SANS, SERIF } from '../theme';
import { T } from '../timing';

const STACK = ['Bun', 'TypeScript', 'React', 'MCP', 'Pi SDK', 'SQLite', 'Docker'];

export const Outro: React.FC = () => (
  <Scene duration={T.outro}>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: SANS,
        color: C.ink,
      }}
    >
      <Reveal at={4} y={16}>
        <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 120, letterSpacing: 3 }}>One</div>
      </Reveal>
      <Reveal at={22}>
        <div style={{ display: 'flex', gap: 14, marginTop: 30 }}>
          {STACK.map((s) => (
            <span
              key={s}
              style={{
                fontFamily: MONO,
                fontSize: 26,
                padding: '8px 18px',
                borderRadius: 12,
                background: C.bubble,
                border: `1px solid ${C.line}`,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </Reveal>
      <Reveal at={46}>
        <div style={{ fontSize: 34, marginTop: 44, fontWeight: 500 }}>源码未公开 · 欢迎面谈时详细讲解设计与实现</div>
      </Reveal>
      <Reveal at={64}>
        <div style={{ fontFamily: MONO, fontSize: 24, marginTop: 20, color: C.accent }}>
          github.com/roy2100/one-hub-showcase
        </div>
      </Reveal>
      <Reveal at={86} style={{ position: 'absolute', bottom: 50 }}>
        <div style={{ fontSize: 22, color: C.faint }}>本视频画面为界面的动画复刻，文章与待办内容均为虚构数据</div>
      </Reveal>
    </div>
  </Scene>
);

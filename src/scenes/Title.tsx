import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Reveal, Scene, lin } from '../anim';
import { C, SANS, SERIF } from '../theme';
import { T } from '../timing';

export const Title: React.FC = () => {
  const f = useCurrentFrame();
  const line = lin(f, 30, 60);
  return (
    <Scene duration={T.title}>
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
        <Reveal at={4} dur={22} y={18}>
          <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 190, letterSpacing: 4 }}>One</div>
        </Reveal>
        <div style={{ width: 220 * line, height: 4, background: C.accent, borderRadius: 2, margin: '10px 0 34px' }} />
        <Reveal at={36} y={12}>
          <div style={{ fontSize: 44, fontWeight: 500, letterSpacing: 2 }}>本机的 GUI Agent</div>
        </Reveal>
        <Reveal at={54} y={12}>
          <div style={{ fontSize: 30, color: C.muted, marginTop: 18, letterSpacing: 1 }}>
            读取我的应用 · 写入必须我点头
          </div>
        </Reveal>
      </div>
    </Scene>
  );
};

import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Capabilities } from './scenes/Capabilities';
import { Architecture } from './scenes/Architecture';
import { ApprovalFlow } from './scenes/ApprovalFlow';
import { Gate } from './scenes/Gate';
import { Outro } from './scenes/Outro';
import { ReadFlow } from './scenes/ReadFlow';
import { Title } from './scenes/Title';
import { C } from './theme';
import { T } from './timing';

const SCENES = [
  { key: 'title', len: T.title, el: <Title /> },
  { key: 'arch', len: T.arch, el: <Architecture /> },
  { key: 'read', len: T.read, el: <ReadFlow /> },
  { key: 'approve', len: T.approve, el: <ApprovalFlow /> },
  { key: 'gate', len: T.gate, el: <Gate /> },
  { key: 'caps', len: T.caps, el: <Capabilities /> },
  { key: 'outro', len: T.outro, el: <Outro /> },
] as const;

export const Showcase: React.FC = () => {
  let from = 0;
  return (
    <AbsoluteFill style={{ background: C.page }}>
      {SCENES.map((s) => {
        const start = from;
        from += s.len;
        return (
          <Sequence key={s.key} from={start} durationInFrames={s.len}>
            {s.el}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

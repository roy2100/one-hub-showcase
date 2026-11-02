import React from 'react';
import { Composition } from 'remotion';
import { Showcase } from './Showcase';
import { FPS, TOTAL } from './timing';

export const Root: React.FC = () => (
  <Composition
    id="OneHubShowcase"
    component={Showcase}
    durationInFrames={TOTAL}
    fps={FPS}
    width={1920}
    height={1080}
  />
);

import React from 'react';
import { Easing, interpolate, useCurrentFrame } from 'remotion';
import { C } from './theme';

const clampOpts = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/** 0 -> 1 between two frames, eased out. */
export const prog = (f: number, from: number, to: number): number =>
  interpolate(f, [from, to], [0, 1], { ...clampOpts, easing: Easing.out(Easing.cubic) });

/** Linear 0 -> 1 between two frames. */
export const lin = (f: number, from: number, to: number): number =>
  interpolate(f, [from, to], [0, 1], clampOpts);

/** The first part of `text` that has been typed by frame `f`. */
export const typed = (text: string, f: number, at: number, charsPerFrame = 0.5): string =>
  text.slice(0, Math.max(0, Math.floor((f - at) * charsPerFrame)));

type RevealProps = {
  at: number;
  dur?: number;
  y?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

/** Fade and rise in from frame `at`. Renders nothing before that. */
export const Reveal: React.FC<RevealProps> = ({ at, dur = 14, y = 10, style, children }) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  const p = prog(f, at, at + dur);
  return (
    <div style={{ opacity: p, transform: `translateY(${(1 - p) * y}px)`, ...style }}>{children}</div>
  );
};

/** Fades a scene in and out at its edges. */
export const Scene: React.FC<{ duration: number; bg?: string; children?: React.ReactNode }> = ({
  duration,
  bg = C.page,
  children,
}) => {
  const f = useCurrentFrame();
  const opacity = Math.min(lin(f, 0, 10), 1 - lin(f, duration - 10, duration));
  return <div style={{ position: 'absolute', inset: 0, background: bg, opacity }}>{children}</div>;
};

export type CaptionItem = { from: number; to: number; text: string };

/** Bottom caption under the stage; switches text by frame range. */
export const Caption: React.FC<{ items: CaptionItem[]; color?: string }> = ({
  items,
  color = C.ink,
}) => {
  const f = useCurrentFrame();
  const item = items.find((i) => f >= i.from && f < i.to);
  if (!item) return null;
  const p = Math.min(lin(f, item.from, item.from + 10), 1 - lin(f, item.to - 8, item.to));
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 34,
        textAlign: 'center',
        fontSize: 34,
        fontWeight: 500,
        letterSpacing: 1,
        color,
        opacity: p,
      }}
    >
      {item.text}
    </div>
  );
};

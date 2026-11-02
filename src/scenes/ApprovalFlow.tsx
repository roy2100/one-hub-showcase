import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { Caption, Reveal, Scene, prog, typed } from '../anim';
import { C } from '../theme';
import { T } from '../timing';
import {
  APPROVE_CENTER,
  ActivityRow,
  ApprovalCard,
  ChatWindow,
  Composer,
  Cursor,
  DENY_CENTER,
  Prose,
  Stage,
  Toast,
  UserBubble,
  APPROVAL_H,
} from '../ui';

const ASK1 = '把「预约年度体检」加到健康待办';
const REPLY1 = '已取消，没有写入任何数据。';
const ASK2 = '好吧，还是加上';
const REPLY2 = '已添加待办「预约年度体检」，分类：其他。';

// Timeline (frames inside this scene).
const SEND1 = 70;
const CARD1_IN = 105;
const CLICK_DENY = 178;
const REPLY1_AT = 200;
const SEND2 = 315;
const CARD2_IN = 345;
const CLICK_APPROVE = 430;
const REPLY2_AT = 455;
const TOAST_AT = 510;

const clampOpts = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const move = (f: number, a: number, b: number, from: number, to: number) =>
  interpolate(f, [a, b], [from, to], { ...clampOpts });

export const ApprovalFlow: React.FC = () => {
  const f = useCurrentFrame();

  const card1 = prog(f, CARD1_IN, CARD1_IN + 14) * (1 - prog(f, CLICK_DENY + 4, CLICK_DENY + 12));
  const card2 = prog(f, CARD2_IN, CARD2_IN + 14) * (1 - prog(f, CLICK_APPROVE + 4, CLICK_APPROVE + 12));
  const cardP = Math.max(card1, card2);
  const bottomPad = 104 + (APPROVAL_H + 12) * cardP;

  const text1 = f < SEND1 ? typed(ASK1, f, 18, 0.4) : '';
  const text2 = f >= 270 && f < SEND2 ? typed(ASK2, f, 270, 0.4) : '';

  // Cursor path: park -> deny, then park -> approve.
  const park = { x: 760, y: 280 };
  let cx = park.x;
  let cy = park.y;
  let click = 0;
  let pressed: 'deny' | 'approve' | null = null;
  let cursorOn = 0;
  if (f >= 130 && f < 215) {
    cursorOn = prog(f, 130, 140) * (1 - prog(f, 200, 214));
    cx = move(f, 140, CLICK_DENY - 6, park.x, DENY_CENTER.x);
    cy = move(f, 140, CLICK_DENY - 6, park.y, DENY_CENTER.y);
    click = move(f, CLICK_DENY, CLICK_DENY + 14, 0, 1);
    pressed = f >= CLICK_DENY && f < CLICK_DENY + 5 ? 'deny' : null;
  } else if (f >= 375 && f < 480) {
    cursorOn = prog(f, 375, 385) * (1 - prog(f, 462, 476));
    cx = move(f, 385, CLICK_APPROVE - 6, park.x, APPROVE_CENTER.x);
    cy = move(f, 385, CLICK_APPROVE - 6, park.y, APPROVE_CENTER.y);
    click = move(f, CLICK_APPROVE, CLICK_APPROVE + 14, 0, 1);
    pressed = f >= CLICK_APPROVE && f < CLICK_APPROVE + 5 ? 'approve' : null;
  }

  return (
    <Scene duration={T.approve} bg={C.backdrop}>
      <Stage>
        <ChatWindow title="健康待办" bottomPad={bottomPad}>
          {f >= SEND1 && (
            <Reveal at={SEND1}>
              <UserBubble>{ASK1}</UserBubble>
            </Reveal>
          )}
          {f >= 88 && (
            <Reveal at={88}>
              <ActivityRow
                state={f < CLICK_DENY + 4 ? 'running' : 'denied'}
                app="health"
                tool="add_todo"
                doneLabel=""
              />
            </Reveal>
          )}
          {f >= REPLY1_AT && (
            <Prose>
              <div>{typed(REPLY1, f, REPLY1_AT, 0.5)}</div>
            </Prose>
          )}
          {f >= SEND2 && (
            <Reveal at={SEND2}>
              <UserBubble>{ASK2}</UserBubble>
            </Reveal>
          )}
          {f >= 328 && (
            <Reveal at={328}>
              <ActivityRow
                state={f < CLICK_APPROVE + 4 ? 'running' : 'done'}
                app="health"
                tool="add_todo"
                doneLabel="思考 · 调用了 1 个工具"
              />
            </Reveal>
          )}
          {f >= REPLY2_AT && (
            <Prose>
              <div>{typed(REPLY2, f, REPLY2_AT, 0.5)}</div>
            </Prose>
          )}
        </ChatWindow>

        {card1 > 0 && f < CARD2_IN && <ApprovalCard p={card1} pressed={pressed} />}
        {card2 > 0 && f >= CARD2_IN && <ApprovalCard p={card2} pressed={pressed} />}
        <Composer text={f < 270 ? text1 : text2} />
        {cursorOn > 0 && <Cursor x={cx} y={cy} click={click} opacity={cursorOn} />}
        <Toast at={TOAST_AT} text="审计日志 +2：拒绝、批准各一条" />
      </Stage>
      <Caption
        items={[
          { from: 15, to: 100, text: '让 agent 写入数据——这是一次「提议」类调用' },
          { from: 105, to: 200, text: '执行前必须你亲自点击：拒绝即阻断，agent 只拿到拒绝结果' },
          { from: 315, to: 450, text: '再次提出后，批准才会真正执行' },
          { from: 455, to: T.approve - 10, text: '每一次决定都写入追加式审计日志' },
        ]}
      />
    </Scene>
  );
};

import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Caption, Reveal, Scene, prog, typed } from '../anim';
import { C } from '../theme';
import { T } from '../timing';
import {
  APPROVE_CENTER, APPROVAL_H, ActivityRow, AnswerCopy, ApprovalCard, ChatWindow, Composer,
  DENY_CENTER, DOCK_PAD, FOOTER_CENTER, PointerAction, Prose, Stage, UserBubble,
} from '../ui';

const ASK1 = '把「预约年度体检」加到健康待办';
const REPLY1 = '已取消，没有写入任何数据。';
const ASK2 = '好吧，还是加上';
const REPLY2 = '已添加待办「预约年度体检」，分类：其他。';

// Scene-relative frames; all click targets come from the shared card geometry.
const SEND1 = 70;
const CARD1_IN = 105;
const CLICK_DENY = 178;
const REPLY1_AT = 200;
const DONE1 = REPLY1_AT + Math.ceil(REPLY1.length / 0.5);
const SEND2 = 315;
const CARD2_IN = 345;
const CLICK_APPROVE = 430;
const REPLY2_AT = 455;
const DONE2 = REPLY2_AT + Math.ceil(REPLY2.length / 0.5);
const FOOTER_OPEN = 535;
const PARK = { x: 760, y: 280 };

export const ApprovalFlow: React.FC = () => {
  const f = useCurrentFrame();
  const card1 = prog(f, CARD1_IN, CARD1_IN + 14) * (1 - prog(f, CLICK_DENY + 4, CLICK_DENY + 12));
  const card2 = prog(f, CARD2_IN, CARD2_IN + 14) * (1 - prog(f, CLICK_APPROVE + 4, CLICK_APPROVE + 12));
  const cardP = Math.max(card1, card2);
  const bottomPad = DOCK_PAD + (APPROVAL_H + 10) * cardP;
  const text1 = f < SEND1 ? typed(ASK1, f, 18, 0.4) : '';
  const text2 = f >= 270 && f < SEND2 ? typed(ASK2, f, 270, 0.4) : '';
  const pressed = f >= CLICK_DENY && f < CLICK_DENY + 5 ? 'deny'
    : f >= CLICK_APPROVE && f < CLICK_APPROVE + 5 ? 'approve' : null;
  const running = (f >= SEND1 && f < DONE1) || (f >= SEND2 && f < DONE2);
  const footerMenu = prog(f, FOOTER_OPEN, FOOTER_OPEN + 4);

  return (
    <Scene duration={T.approve} bg={C.backdrop}>
      <Stage>
        <ChatWindow title="健康待办" bottomPad={bottomPad} footerMenu={footerMenu}>
          {f >= SEND1 && <Reveal at={SEND1}><UserBubble>{ASK1}</UserBubble></Reveal>}
          {f >= 88 && (
            <Reveal at={88}>
              <ActivityRow state={f < CLICK_DENY + 4 ? 'running' : 'denied'} app="health" tool="add_todo" doneLabel="调用了 health" />
            </Reveal>
          )}
          {f >= REPLY1_AT && (
            <div>
              <Prose>{typed(REPLY1, f, REPLY1_AT, 0.5)}</Prose>
              {f >= DONE1 && <AnswerCopy />}
            </div>
          )}
          {f >= SEND2 && <Reveal at={SEND2}><UserBubble>{ASK2}</UserBubble></Reveal>}
          {f >= 328 && (
            <Reveal at={328}>
              <ActivityRow state={f < CLICK_APPROVE + 4 ? 'running' : 'done'} app="health" tool="add_todo" doneLabel="调用了 health" />
            </Reveal>
          )}
          {f >= REPLY2_AT && (
            <div>
              <Prose>{typed(REPLY2, f, REPLY2_AT, 0.5)}</Prose>
              {f >= DONE2 && <AnswerCopy />}
            </div>
          )}
        </ChatWindow>
        {card1 > 0 && f < CARD2_IN && <ApprovalCard p={card1} pressed={pressed} />}
        {card2 > 0 && f >= CARD2_IN && <ApprovalCard p={card2} pressed={pressed} />}
        <Composer text={f < 270 ? text1 : text2} running={running} />
        <PointerAction at={CLICK_DENY} until={215} from={PARK} to={DENY_CENTER} />
        <PointerAction at={CLICK_APPROVE} until={480} from={PARK} to={APPROVE_CENTER} />
        <PointerAction at={FOOTER_OPEN} until={565} from={{ x: 360, y: 480 }} to={FOOTER_CENTER} />
      </Stage>
      <Caption items={[
        { from: 15, to: 100, text: '让 agent 写入数据——这是一次「提议」类调用' },
        { from: 105, to: 200, text: '执行前必须你亲自点击：拒绝即阻断，agent 只拿到拒绝结果' },
        { from: 315, to: 450, text: '再次提出后，允许才会真正执行' },
        { from: 455, to: T.approve - 10, text: '每一次决定都写入追加式审计日志' },
      ]} />
    </Scene>
  );
};

import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Caption, Reveal, Scene, prog, typed } from '../anim';
import { C } from '../theme';
import { T } from '../timing';
import {
  ActivityRow, AnswerCopy, ChatWindow, Composer, DOCK_PAD, MCP_CENTER, PANEL_CENTER,
  PointerAction, Prose, Stage, ToolCard, UserBubble,
} from '../ui';

const QUESTION = '今天订阅里有什么值得读的？';
const LEAD = '今天有 18 篇新文章，我挑了三篇值得读的：';
const TOOL = 'get_today_articles';

// Scene-relative frames. Keep demonstrated clicks and UI state changes on the same frame.
const SEND_AT = 75;
const TOOL_DONE = 150;
const PANEL_OPEN = 300;
const PANEL_CLOSE = 390;
const COLLAPSE = 423;
const REOPEN = 463;
const ANSWER_AT = 480;
const DONE_AT = 614;
const PARK = { x: 960, y: 160 };

const ITEMS = [
  '《本地优先软件的同步取舍》——CRDT 与服务端权威两条路线各自的代价。',
  '《给 Agent 设计工具：少而精》——工具数量与描述质量如何影响调用准确率。',
  '《SQLite 在生产环境的几个误区》——WAL、备份与并发写。',
];

export const ReadFlow: React.FC = () => {
  const f = useCurrentFrame();
  const composerText = f < SEND_AT ? typed(QUESTION, f, 20, 0.35) : '';
  const expandP = prog(f, 185, 205) - prog(f, 268, 288);
  const mcpPanel = prog(f, PANEL_OPEN, PANEL_OPEN + 4) * (1 - prog(f, PANEL_CLOSE, PANEL_CLOSE + 3));
  const collapsed = prog(f, COLLAPSE, COLLAPSE + 6) - prog(f, REOPEN, REOPEN + 6);

  return (
    <Scene duration={T.read} bg={C.backdrop}>
      <Stage>
        <ChatWindow title="今天的订阅" bottomPad={DOCK_PAD} collapsed={collapsed} mcpPanel={mcpPanel}>
          {f >= SEND_AT && <Reveal at={SEND_AT}><UserBubble>{QUESTION}</UserBubble></Reveal>}
          {f >= 95 && (
            <Reveal at={95}>
              <ActivityRow state={f < TOOL_DONE ? 'running' : 'done'} app="feedoverflow" tool={TOOL}
                expand={expandP} doneLabel="查询了 feedoverflow" />
            </Reveal>
          )}
          {expandP > 0 && (
            <ToolCard p={expandP} name="mcp__feedoverflow__get_today_articles" args={'{\n  "limit": 20\n}'}
              output="共 18 篇 · 来自 9 个订阅源 · 返回标题、来源、发布时间与摘要" />
          )}
          {f >= ANSWER_AT && (
            <div>
              <Prose>
                <div>{typed(LEAD, f, ANSWER_AT, 0.7)}</div>
                {ITEMS.map((t, i) => (
                  <Reveal key={i} at={525 + i * 26} y={6}>
                    <div style={{ paddingLeft: 8 }}>{i + 1}. {t}</div>
                  </Reveal>
                ))}
                <Reveal at={600} y={6}>
                  <div style={{ marginTop: 6 }}>需要的话，我可以读其中任意一篇的全文。</div>
                </Reveal>
              </Prose>
              {f >= DONE_AT && <AnswerCopy />}
            </div>
          )}
        </ChatWindow>
        <Composer text={composerText} collapsed={collapsed} running={f >= SEND_AT && f < DONE_AT} />
        <PointerAction at={PANEL_OPEN} until={PANEL_OPEN + 28} from={PARK} to={MCP_CENTER} />
        <PointerAction at={PANEL_CLOSE} until={PANEL_CLOSE + 22} from={MCP_CENTER} to={MCP_CENTER} />
        <PointerAction at={COLLAPSE} until={COLLAPSE + 24} from={{ x: 180, y: 96 }} to={PANEL_CENTER} />
        <PointerAction at={REOPEN} until={REOPEN + 16} from={PANEL_CENTER} to={PANEL_CENTER} />
      </Stage>
      <Caption items={[
        { from: 15, to: 150, text: '用自然语言提问，agent 自己决定调用哪个应用的工具' },
        { from: 150, to: 290, text: '读取类调用自动执行，过程可展开审阅' },
        { from: 295, to: 400, text: '一个图标查看九个应用，逐个控制只读权限' },
        { from: 405, to: 475, text: '收起侧边栏，展开后回到原来的宽度' },
        { from: ANSWER_AT, to: T.read - 10, text: '回答直接建立在应用的真实数据之上' },
      ]} />
    </Scene>
  );
};

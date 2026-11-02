import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Caption, Reveal, Scene, prog, typed } from '../anim';
import { C } from '../theme';
import { T } from '../timing';
import { ActivityRow, ChatWindow, Composer, Prose, Stage, ToolCard, UserBubble } from '../ui';

const QUESTION = '今天订阅里有什么值得读的？';
const LEAD = '今天有 18 篇新文章，我挑了三篇值得读的：';
const SEND_AT = 75;
const TOOL = 'get_today_articles';

const ITEMS = [
  '《本地优先软件的同步取舍》——CRDT 与服务端权威两条路线各自的代价。',
  '《给 Agent 设计工具：少而精》——工具数量与描述质量如何影响调用准确率。',
  '《SQLite 在生产环境的几个误区》——WAL、备份与并发写。',
];

export const ReadFlow: React.FC = () => {
  const f = useCurrentFrame();
  const composerText = f < SEND_AT ? typed(QUESTION, f, 20, 0.35) : '';
  const runningUntil = 150;
  const expandP = prog(f, 185, 205) - prog(f, 268, 288);

  return (
    <Scene duration={T.read} bg={C.backdrop}>
      <Stage>
        <ChatWindow title="今天的订阅" bottomPad={104}>
          {f >= SEND_AT && (
            <Reveal at={SEND_AT}>
              <UserBubble>{QUESTION}</UserBubble>
            </Reveal>
          )}
          {f >= 95 && (
            <Reveal at={95}>
              <ActivityRow
                state={f < runningUntil ? 'running' : 'done'}
                app="feedoverflow"
                tool={TOOL}
                expand={expandP}
                doneLabel="思考 · 调用了 1 个工具"
              />
            </Reveal>
          )}
          {expandP > 0 && (
            <ToolCard
              p={expandP}
              name="mcp__feedoverflow__get_today_articles"
              args='{ "limit": 20 }'
              output="共 18 篇 · 来自 9 个订阅源 · 返回标题、来源、发布时间与摘要"
            />
          )}
          {f >= 295 && (
            <Prose>
              <div>{typed(LEAD, f, 295, 0.7)}</div>
              {ITEMS.map((t, i) => (
                <Reveal key={i} at={345 + i * 26} y={6}>
                  <div style={{ paddingLeft: 8 }}>
                    {i + 1}. {t}
                  </div>
                </Reveal>
              ))}
              <Reveal at={430} y={6}>
                <div style={{ marginTop: 6 }}>需要的话，我可以读其中任意一篇的全文。</div>
              </Reveal>
            </Prose>
          )}
        </ChatWindow>
        <Composer text={composerText} />
      </Stage>
      <Caption
        items={[
          { from: 15, to: 150, text: '用自然语言提问，agent 自己决定调用哪个应用的工具' },
          { from: 150, to: 290, text: '读取类调用自动执行，过程可展开审阅' },
          { from: 295, to: T.read - 10, text: '回答直接建立在应用的真实数据之上' },
        ]}
      />
    </Scene>
  );
};

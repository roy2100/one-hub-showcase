# One — 项目展示

[English](README.en.md) | 简体中文

**One** 是运行在我自己 Mac 上的个人 GUI Agent。你在网页里和它对话，它通过各个自托管应用的
[MCP](https://modelcontextprotocol.io) server 读取数据，而**所有写操作都必须在界面上由我
明确点击确认**。

源码未公开。本仓库只包含一个用 [Remotion](https://www.remotion.dev) 制作的演示视频，以及
一份设计说明。欢迎在面试中现场讲解代码。

## 演示视频

[`assets/one-hub-showcase.mp4`](assets/one-hub-showcase.mp4)，约 80 秒。

画面是界面的**动画复刻**，使用**虚构数据**（文章标题和待办内容都是编造的）。其中出现的工具名
（`get_today_articles`、`add_todo`）、审批规则和整体架构都是真实的。

## 它是什么

- **是宿主，不是框架。** Agent 循环由 [Pi](https://pi.dev)（SDK 模式）负责。本项目是它外面的
  宿主：一个持有会话的 Bun + TypeScript 服务端，加一个渲染会话的 React PWA 客户端。
- **应用只通过 MCP 接入。** 宿主不 import 任何应用的代码，也不认识应用的数据表结构。目前接入
  四个应用：投资组合、RSS 阅读器、健康记录、个人日志。

```
浏览器 (React PWA) <-- WebSocket --> One 服务端 (Bun + TypeScript)
                                       |- Pi SDK AgentSession
                                       |- 审批闸门 + 工具策略
                                       |- SQLite：审计、记忆、定时任务
                                       '-- MCP --> networth / feedoverflow / health / daylog
```

## 值得展开聊的设计决策

- **只有明确的批准才能运行非只读工具。** 拒绝、中断、最后一个浏览器离开、或根本没有浏览器连着，
  都会阻断调用：不会挂起等待，也不会默认放行。
- **工具策略是有序的 glob 列表**（`read` / `propose` / `write`，先匹配先生效）。未登记的工具
  按 `write` 处理。代码执行工具内部发起的调用也会被逐个拦截。
- **默认存在 prompt injection。** 文章正文和网页内容都视为不可信，读过之后会话被标记为受污染，
  此后写入记忆需要再确认。
- **追加式审计日志**记录每一次闸门决定；审计写入失败也不会变成隐式批准。
- **按应用的只读开关**只会阻断，永远不会自动批准。
- **定时任务和「灵感」运行天然只读**，所以「没有浏览器就不会有写入」没有例外。
- **离线沙箱**执行代码：一次性容器，无网络、根文件系统只读、只挂载工作区。
- **Web Push 基于 `node:crypto` 自行实现**（RFC 8291 / 8292），测试逐字节复现 RFC 8291 的
  测试向量。
- **测试从不调用真实模型或真实应用**，全部跑在 Pi 的脚本化假模型上。

## 重新渲染视频

```bash
npm install
npm run dev     # Remotion Studio，实时预览
npm run build   # 渲染 out/one-hub-showcase.mp4
npm run check   # 类型检查
```

中文文字使用 macOS 系统字体（PingFang SC / Songti SC），请在 Mac 上渲染。计划与分镜见
[`docs/plan-showcase-video.md`](docs/plan-showcase-video.md)。

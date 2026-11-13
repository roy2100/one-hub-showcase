# One — showcase

English | [简体中文](README.md)

**One** is a personal GUI agent that runs on my own Mac. You chat with it in a web page; it
reads data from my self-hosted apps through their [MCP](https://modelcontextprotocol.io)
servers, and **every write needs my explicit click** in the UI.

The source code is closed. This repository only holds a promo video (built with
[Remotion](https://www.remotion.dev)) and a short write-up of the design. I am happy to walk
through the code in an interview.

## Video

[`assets/one-hub-showcase.mp4`](assets/one-hub-showcase.mp4) — about 80 seconds.

The footage is an **animated recreation** of the UI with **fictional data** (article titles
and the todo item are made up). The tool names (`get_today_articles`, `add_todo`), the approval
rules and the architecture are real. The video was made in early November 2026 and shows only
the first four apps, in the colors of that time.

## What it is

- **Host, not framework.** The agent loop is [Pi](https://pi.dev) in SDK mode. This project is
  the host around it: a Bun + TypeScript server that owns the sessions, and a React PWA client
  that renders them.
- **Apps are reached only through MCP.** The host never imports app code or knows an app's
  schema; adding an app is one MCP config entry, a few policy rules and their tests, with no
  server code. Nine MCP servers are wired in:
  - self-hosted apps: a portfolio tracker, an RSS reader, a health record and a personal day
    log (readable and writable, every write approved);
  - read-only sources: my mailbox (IMAP, read-only), Yahoo Finance market data, weather
    (Open-Meteo), Polymarket prediction-market odds, and the nightly backup and security audit
    reports of the Mac and its VPS.

```
Browser (React PWA) <-- WebSocket --> One server (Bun + TypeScript)
                                       |- Pi SDK AgentSession
                                       |- approval gate + tool policy
                                       |- SQLite: audit, memory, tasks
                                       |- MCP --> networth / feedoverflow / health / daylog
                                       '-- MCP (read-only) --> email / yfinance / weather / polymarket / deploy-ops
```

## Design decisions worth talking about

- **Only an explicit approve runs a non-read tool.** Deny, abort, the last browser leaving, or
  no browser attached at all all block the call; nothing is left waiting and nothing runs by
  default.
- **Tool policy is an ordered glob list** (`read` / `propose` / `write`, first match wins).
  Unlisted tools are treated as `write`. Calls made inside a code-execution tool are gated one
  by one.
- **Prompt injection is assumed.** Article text, mail, web pages and market descriptions are
  untrusted; they mark the session as tainted, and memory writes after reading them need a
  confirmation.
- **Exfiltration has its own gate.** `web_fetch` skips approval only for a URL that appears
  verbatim in my message or a tool result; a URL the model composed (which could carry data it
  read in its query string) waits for my click. Markdown images in answers render only from
  this origin, backed by CSP `img-src 'self'`.
- **Append-only audit log** of every gate decision; a failed audit write never turns into an
  implicit approve.
- **Per-app read-only switches** can only ever block, never auto-approve.
- **Scheduled and "ideas" runs are read-only** by construction, so "no browser, no write" has
  no exception.
- **Offline sandbox** for code execution: a throwaway container with no network, a read-only
  root filesystem, and only the workspace mounted.
- **Web Push implemented on `node:crypto`** (RFC 8291 / 8292); the tests reproduce the RFC 8291
  test vector byte for byte.
- **Tests never call a real model or a real app**; they run against Pi's scripted faux model.
- **Answer quality has a kept evaluation** (`make eval`): 23 cases on made-up app data, behind
  tools whose names, descriptions and schemas are snapshotted from the real MCP servers. Each
  run goes through the real session, gate and policy with the real model, and the harness
  denies every approval. Code graders come first, an LLM judge only where code cannot grade, and
  each run is diffed against the last. No hosted tracing: a trace of a real conversation is my
  holdings, health and mail.
- **Product principles and metrics are written down**: mission, values, core scenarios and the
  order of trade-offs, each value tied to an invariant in the code; `make metrics` reads the
  north-star and guardrail numbers from production, read-only.
- **Large schemas load on demand.** The weather server's 17 tool schemas are about 106 KB;
  declared all at once they made high-reasoning requests fail upstream. Only two common tools are
  declared directly; the rest load through `tool_search`.
- **Each answer lists its sources**, extracted from the turn's tool calls (including a
  code-execution script's code and output), not from a prompt asking the model to cite.

## Rebuilding the video

```bash
npm install
npm run dev     # Remotion Studio, live preview
npm run build   # renders out/one-hub-showcase.mp4
npm run check   # type-check
```

CJK text uses macOS system fonts (PingFang SC / Songti SC), so render on a Mac. The plan and
storyboard are in [`docs/plan-showcase-video.md`](docs/plan-showcase-video.md).

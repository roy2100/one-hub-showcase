# One — showcase

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
rules and the architecture are real.

## What it is

- **Host, not framework.** The agent loop is [Pi](https://pi.dev) in SDK mode. This project is
  the host around it: a Bun + TypeScript server that owns the sessions, and a React PWA client
  that renders them.
- **Apps are reached only through MCP.** The host never imports app code or knows an app's
  schema. Four apps are wired in: a portfolio tracker, an RSS reader, a health record and a
  personal day log.

```
Browser (React PWA) <-- WebSocket --> One server (Bun + TypeScript)
                                       |- Pi SDK AgentSession
                                       |- approval gate + tool policy
                                       |- SQLite: audit, memory, tasks
                                       '-- MCP --> networth / feedoverflow / health / daylog
```

## Design decisions worth talking about

- **Only an explicit approve runs a non-read tool.** Deny, abort, the last browser leaving, or
  no browser attached at all all block the call; nothing is left waiting and nothing runs by
  default.
- **Tool policy is an ordered glob list** (`read` / `propose` / `write`, first match wins).
  Unlisted tools are treated as `write`. Calls made inside a code-execution tool are gated one
  by one.
- **Prompt injection is assumed.** Article text and web pages are untrusted; they mark the
  session as tainted, and memory writes after reading them need a confirmation.
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

## Rebuilding the video

```bash
npm install
npm run dev     # Remotion Studio, live preview
npm run build   # renders out/one-hub-showcase.mp4
npm run check   # type-check
```

CJK text uses macOS system fonts (PingFang SC / Songti SC), so render on a Mac. The plan and
storyboard are in [`docs/plan-showcase-video.md`](docs/plan-showcase-video.md).

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in this repository.

## Overview

A **public, code-free showcase** for One (`one-hub`), a closed-source personal GUI agent. The
repo holds a Remotion project that renders an ~82 s promo video, plus READMEs describing the
design. It exists so a resume can link to something clickable without opening the private
source. The audience is recruiters and technical interviewers, mostly in mainland China.

## Commands

```bash
npm install      # first time
npm run dev      # Remotion Studio (live preview, scrub the timeline)
npm run build    # render out/one-hub-showcase.mp4 (H.264, CRF 20); out/ is git-ignored
npm run check    # tsc --noEmit
```

After a render that should ship, copy `out/one-hub-showcase.mp4` to `assets/one-hub-showcase.mp4`
(the committed copy the READMEs link to).

## Hard rules

- **Never copy anything from the private `one-hub` repo** — no source, config, hostnames, IPs,
  `root@` targets or real data. Its docs contain a VPS IP and a personal domain; keep them out
  of this repo, the video and the READMEs. Only public design facts (README / DESIGN.md
  behaviour, color tokens) are used.
- **The video is an animated recreation with fictional data.** Article titles and todo text are
  made up; tool names (`get_today_articles`, `add_todo`), approval levels and architecture must
  stay true to One. Keep the on-screen disclaimer in `scenes/Outro.tsx` and the matching note in
  both READMEs.
- Don't claim One is a self-built agent framework: the agent loop is Pi (SDK mode). One is the
  host — approval gate, policy, sandbox, memory, scheduling, UI.
- Don't self-test visuals with screenshots or a headless browser. After a change, give the owner
  manual steps: `npm run dev`, which scene and frame range to scrub, what to look for.

## Architecture

- `src/index.ts` → `Root.tsx` registers one `Composition` (`OneHubShowcase`, 1920x1080, 30 fps)
  whose length is `TOTAL` from `timing.ts`.
- `src/timing.ts` — `T` holds every scene's length in frames; `Showcase.tsx` lays the scenes out
  back to back with `Sequence`. **Change a scene's length only in `T`.** Frame numbers inside a
  scene are relative to that scene's start and are hard-coded timelines, so lengthening a scene
  usually means retiming its inner constants too.
- `src/scenes/` — `Title`, `Architecture`, `ReadFlow`, `ApprovalFlow`, `Gate`, `Capabilities`,
  `Outro`. Each wraps itself in `Scene` (edge fade) and uses `Reveal` / `typed` / `prog` from
  `anim.tsx`.
- `src/ui.tsx` — the recreated One UI (sidebar, top bar, composer, activity row, approval card,
  cursor, toast) drawn on a 1200x620 `Stage` scaled 1.5x. Approval buttons are absolutely
  positioned and `DENY_CENTER` / `APPROVE_CENTER` are exported so the cursor aims at exact
  coordinates — move a button and those constants together.
- `src/theme.ts` — color tokens copied from One's published DESIGN.md (light theme), app identity
  colors, and the font stacks. DM Sans loads from Google Fonts at render time; CJK glyphs use
  macOS system faces (PingFang SC / Songti SC), so **render on a Mac**.

## Conventions

- Video on-screen text is Simplified Chinese. Code, comments, commit messages and docs are
  English, except `README.md`, which is deliberately Chinese (the default GitHub landing page
  for a mainland-China audience).
- `README.en.md` is the English twin. Keep the two in sync: same sections, same claims, and the
  language switch links at the top.
- Plans live in `docs/plan-*.md`; append an `## Outcome` section when the work is done.
- Commits follow Conventional Commits in English.

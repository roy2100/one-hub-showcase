# Plan: One showcase repo and promo video

## Goal

Give the closed-source `one-hub` project a public face for the resume and for interviews: a
code-free GitHub repo (`one-hub-showcase`) holding a README, an architecture description and a
~75 s promo video made with Remotion.

## Scope

In:
- Local project at `~/Project/one-hub-showcase`, GitHub repo `roy2100/one-hub-showcase`
  (created **private**; the owner flips it to public after reviewing the video).
- A Remotion project (1920x1080, 30 fps) that renders an animated recreation of One's UI
  with fictional demo data.
- README with the architecture and the video link; the rendered mp4 committed under `assets/`.

Out:
- Any `one-hub` source code, config, hostnames, IPs, or real data from networth / health /
  daylog / feedoverflow. Nothing is copied from the private repo except public design facts
  (color tokens, behaviour described in its README/CLAUDE.md).
- Real screen recording; resume edits (separate task, waits for the video URL).

## Storyboard (30 fps)

1. Title (4 s): wordmark "One" + one-line pitch.
2. Architecture (10 s): browser (React) <-> Bun server (Pi SDK session, approval gate, policy)
   <-> MCP servers (networth, feedoverflow, health, daylog). "The agent knows apps only through MCP."
3. Read flow (14 s): user asks about today's articles; a folded activity row
   "think - called 1 tool" (feedoverflow `get_today_articles`); serif answer.
4. Approval flow (18 s): user asks to add a health todo; approval card for `health.add_todo`
   (propose, blue); deny -> blocked; retry -> approve -> executed.
5. Gate (14 s): tool call -> policy (read / propose / write) -> read passes, others need an
   explicit approve; deny / abort / disconnect all block; every decision lands in an append-only
   audit log; external text is treated as tainted.
6. Capabilities (11 s): memory, scheduled tasks + Web Push, offline sandbox, file workspace,
   web search, per-app read-only switch.
7. Outro (7 s): stack line, "source closed", disclaimer that the footage is an animated
   recreation with fictional data.

## Steps

1. Write this plan.
2. Scaffold the Remotion project (package.json, tsconfig, remotion.config.ts, src/Root.tsx).
3. Add theme tokens (from One's published DESIGN.md) and shared animation helpers.
4. Build the seven scenes as separate components.
5. Wire them into one composition with `Sequence`; type-check.
6. Render `out/one-hub-showcase.mp4`; copy to `assets/`; check size and duration with ffprobe.
7. Write README (English) and `.gitignore`.
8. Commit, create the private GitHub repo, push.
9. Hand the owner manual review steps (Remotion Studio) and the command to make the repo public.

## Risks / open questions

- The look is a recreation, not footage: the video and README must say so. Tool names shown are
  real (`get_today_articles`, `add_todo`); article titles and todo text are fictional.
- CJK glyphs rely on macOS system fonts (PingFang SC / Songti SC); render on the owner's Mac.
- Visual quality cannot be checked by me (no self-screenshots by house rule); the owner reviews
  in Remotion Studio and I iterate on feedback.
- The private repo's docs expose a VPS IP and domain: none of that is used here.

## Complexity

Medium.

## Outcome

Done as planned, with these deviations:
- Final length is 82 s (2460 frames): the read flow grew to 16 s and the approval flow to 20 s
  so the tool-call expansion and the deny / approve sequence are readable.
- The mp4 is 1920x1080, 30 fps, H.264, 2.2 MB, committed at `assets/one-hub-showcase.mp4`.
- Visuals were not inspected by me (house rule against self-screenshots); the render itself and
  `tsc --noEmit` pass. Layout and timing still need the owner's review in Remotion Studio.
- The GitHub repo is created private; making it public is left to the owner.

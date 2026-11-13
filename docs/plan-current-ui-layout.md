# Plan: bring the recreated chat UI up to date

## Goal

Finish the UI layout work left out of the previous video refresh. Show the current desktop
sidebar and MCP status control, with visible cursor actions demonstrating their behavior.
The audience remains recruiters and technical interviewers. All content stays fictional.

## Scope

In:
- Reimplement the documented public UI behavior in the showcase, without copying private
  application components, configuration, addresses or owner data.
- A 52 px header band with an edge-to-edge hairline; the sidebar panel toggle, clipped
  collapse animation, grouped conversations, and one footer row with a version and menu.
- One neutral MCP Blocks icon with no count while all apps are connected; a panel with nine
  app rows, tool counts and read-only switches. Tool counts and switch settings in this
  recreation are illustrative, not a production status snapshot.
- Current Focus activity labels, expanded tool wells, a two-row composer with attachment,
  stop and send controls, and the current approval card with full JSON arguments and
  Allow then Deny buttons. Update cursor targets with the button geometry.
- Re-render the committed MP4, update both READMEs, and commit and push the result.

Out: production One code or settings, live app calls, and the separate README inline-video
attachment upload. No browser-driven verification or screenshots.

## Design direction

Follow One's existing documented design rather than introduce a new style. White (#ffffff),
sidebar gray (#fafafa), well gray (#f3f3f3), solid ink (#1a1a1a), clay (#c6613f), and approval
blue (#3366c4). DM Sans/PingFang for chrome, Songti for answers, SF Mono for arguments.
Left-align content and keep one centered reading column. The sidebar and main header share
a baseline; the composer and approval card share the reading column's edges. Color identifies
apps inside the panel and tools, not in the top bar. No new decorative treatment.

```text
[panel  One           ] | title v                             [blocks]
[New / Ideas / Tasks  ] |                [nine-app panel when opened]
[grouped conversations] |        user message
[                     ] |        activity >
[                     ] |        answer
[version       sliders] |        approval, when waiting
                        |        text input
                        |        paperclip              stop / send
```

## Steps

1. Rewrite the standalone recreated UI around shared geometry for sidebar width, header,
   reading column, composer and approvals. Keep it driven by Remotion frames.
2. Extend the read scene from 480 to 660 frames: preserve the tool expansion, demonstrate
   the MCP panel, collapse and reopen the sidebar, then finish the answer. The video becomes
   88 seconds. Use cursor clicks and matching captions for each demonstrated action.
3. Update the approval scene's button targets, composer state, labels and final answer copy
   control. Keep its existing 600-frame duration.
4. Update the README duration and description in both languages, and the showcase maintenance
   guidance for shared geometry and the new read-scene timeline.
5. Run the type check, inspect the diff and check key geometry/timeline boundaries without
   running a browser. Render the MP4 using the existing build command, inspect media metadata,
   and copy the rendered output to assets.
6. Append the Outcome, commit the changes and publish them to the existing repository.

## Risks / open questions

- At a 620 px stage height, approvals and a taller composer reduce the visible transcript.
  Clip only the transcript at its viewport; never clip approval arguments or buttons.
- The collapse must move the transcript and dock together without reflowing sidebar text.
- Remotion must calculate animations from frames for deterministic scrubbing and rendering.
- Visual review remains with the owner. Provide Studio URL, global frames and expected results.

## Complexity

Medium.

## Outcome

Completed on 2026-11-13.

- Rebuilt the standalone recreation with a shared 52 px header band, clipped sidebar
  collapse/reopen, fixed panel toggle, grouped conversations, and the single footer menu.
  The transcript and composer use the same collapse progress and centered column geometry.
- Replaced the top-bar app dots/count with one neutral Blocks icon. The read scene opens
  its nine-app panel, closes it, and clicks the sidebar toggle to collapse and reopen.
  Connection counts, switches and version are synthetic; the READMEs and video disclaimer
  distinguish the recreation from a live status snapshot.
- Updated descriptive Focus labels and their frame-driven shimmer, indented tool details,
  argument/output wells, the two-row composer, stop/send controls and answer copy icons.
- Updated approvals to the current badge/sentence header, full JSON on the level's soft
  surface, and left-aligned Allow then Deny buttons. Cursor centers derive from the exact
  same button geometry. Replaced the fictional audit toast with opening the footer menu,
  where the audit-log entry is visible.
- `npm run check`, `git diff --check`, and the complete `npm run build` passed. Reviewed the
  layout arithmetic and click/state timing in code. No browser verification or screenshots
  were used; visual acceptance remains a manual owner check.
- Rendered 2640 frames: 88 seconds, 1920x1080, 30 fps, H.264, 2,453,690 bytes. Copied the MP4
  into `assets/` and verified that it has the same SHA-256 as the render output.
- Updated both README descriptions and maintenance guidance. No private application code,
  configuration, addresses or owner data were added. No changes to production One.

Manual review: run `npm run dev -- --port=3001`, open `http://localhost:3001`, and select
`OneHubShowcase`. Frames below are global composition frames, not scene-relative:

1. Frames 720–813 (24–27.1 s): click the sole MCP icon; inspect nine rows, tool counts,
   switches and the note. The panel closes before the sidebar demonstration.
2. Frames 843–889 (28.1–29.6 s): sidebar collapses and reopens. The toggle stays at the
   same place; the sidebar text does not reflow; transcript and composer move together.
3. Frames 1185–1270 and 1425–1522 (39.5–42.3 s and 47.5–50.7 s): full JSON and both approval
   buttons remain visible, and the pointer clicks Deny then Allow at their new positions.
4. Frames 1615–1660 (53.8–55.3 s): footer menu opens with Settings and Audit log. Also inspect
   the two-row composer and trailing activity chevrons throughout both chat scenes.

No changes to the planned video length or scope beyond making the footer menu visible in
place of the previous simulated audit toast. The separate README attachment upload remains
outside this change.

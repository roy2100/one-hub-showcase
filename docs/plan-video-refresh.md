# Plan: refresh the video for One as of mid-November 2026

## Goal

The video was made on 2026-11-02. Since then One added five read-only MCP servers (email,
yfinance, weather, polymarket, deploy-ops) and moved to a neutral palette (white surfaces, black
at low alpha for text and lines, one clay accent; dark mode removed). Bring the video's
architecture scene and colors in line, re-render, and drop the "made in early November, old
colors" caveat from both READMEs.

## Scope

In:
- `src/theme.ts`: the neutral tokens and the per-app colors from One's current published design
  tokens, plus the five new apps.
- Hard-coded warm colors in `src/ui.tsx` and `src/scenes/Architecture.tsx` (shadows, the
  server box tint). `C.ink` is now translucent, so fills (toast, cursor) use a solid ink token.
- `src/scenes/Architecture.tsx`: nine MCP servers in two groups, 读写 (four apps, writes
  approved) and 只读 (five sources), in a compact column that fits 1080 px.
- Re-render, copy to `assets/`, update both READMEs, commit and push.

Out:
- The recreated UI's layout (sidebar, top bar, MCP popover) stays as it is; only its colors
  change. One's layout has moved too (collapsible sidebar, one MCP status icon), but redrawing it
  is a separate job.
- New scenes (eval, sources). The README covers them.
- Scene lengths: `T` is unchanged; the MCP column's stagger is tightened to fit nine entries.

## Steps

1. Update `theme.ts` (tokens, `inkSolid`, a neutral `backdrop`, `APP` for nine apps).
2. Replace the warm `rgba(31,30,29,…)` shadows and the clay tint with neutral/token values;
   toast and cursor fills use `inkSolid`.
3. Rework the MCP column in `Architecture.tsx`: group labels, nine rows of 64 px at a 74 px
   pitch, lines fanning out from the server box; reveals 6 frames apart.
4. `npm run check`, `npm run build`, copy the mp4 to `assets/`, check it with ffprobe.
5. README.md / README.en.md: remove the caveat sentence.
6. Commit with this plan and its Outcome; push.

## Risks / open questions

- Nine rows plus two labels must clear the title (ends near y = 140) and the bottom caption
  (from about y = 955). Checked by arithmetic only; the owner reviews in Remotion Studio.
- Translucent ink on the white page reads the same as before; on colored fills it would not, which
  is why fills get `inkSolid`.

## Complexity

Low–Medium.

## Outcome

Done as planned (2026-11-13):
- `theme.ts` carries One's neutral tokens and nine app colors; `inkSolid` fills the toast and the
  cursor; the warm shadows and the clay tint in `ui.tsx` / `Architecture.tsx` are neutral or
  token values now.
- The architecture scene shows two labelled groups (four self-hosted apps, five read-only
  sources), rows 64 px at a 74 px pitch, revealed 6 frames apart; the bottom caption moved to
  frame 200 and 60 px from the bottom.
- `npm run check` passes; the render is 82 s, 1920x1080, H.264, 2.2 MB, copied to `assets/`.
- The READMEs no longer call the colors outdated; they say the UI layout is still the early
  November one, which remains out of scope.
- Visuals were not inspected by me (house rule); the owner reviews in Remotion Studio.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current state

The app is implemented in `index.html` + `app.js`, with tests in `test.html`. `spec.md` (a Traditional Chinese requirements spec) is the source of truth — read it before changing behaviour. There is no build tooling or `package.json`; `test.html` is opened directly in a browser to run the tests.

## Development conventions

- **Three files only.** The app is `index.html` + `app.js` + `test.html` at the repo root. `index.html` holds all HTML/CSS and the bulk of the JS inline; `app.js` holds the booking-conflict logic and is loaded via a plain `<script src="app.js">` tag (NOT an ES module, since the page is opened by double-clicking the file); `test.html` holds the tests. Do not split into any further files (no separate `.css`, no more `.js`, no modules) and do not introduce any external framework or library (no React, Vue, jQuery, Tailwind, etc.). Plain HTML/CSS/vanilla JS.
- **Traditional Chinese everywhere.** All UI text and all code comments are written in Traditional Chinese (繁體中文).
- **After every change, state what changed in one sentence.**

## What this project is

A single-machine meeting-room booking board ("會議室預約看板"). It runs on one shared office computer: colleagues open it in a desktop browser to see the day's bookings for 3 rooms and reserve a slot by typing their name. Deliberately minimal.

## Hard constraints (from spec.md §4–5)

These are explicit non-goals — do not add them without the user asking:

- **Pure frontend, no backend.** No server, no database, no Firebase/Supabase. Must work opened directly as a file or served as a static page on an intranet host.
- **No external network calls at all.** Must function fully offline. Any dependency must be vendored/bundled, not loaded from a CDN.
- **Storage is `localStorage` only** — single machine, single browser. No cross-device sync.
- **No auth, no identity.** No login, no PIN, no per-browser ownership tracking. Anyone can edit or delete any booking.
- **Single-day view only**, 3 rooms side by side. No week view, no room-attribute management, no multi-location.
- Hour-granularity slots; working hours default 09:00–18:00 (a constant). Weekends are not bookable.
- Target browser: recent desktop Chrome/Edge. Local machine time; no timezone handling.

## Core domain rules (from spec.md §3, §7)

- Booking model: `booking = { id, roomId, date (YYYY-MM-DD), startHour, endHour, name, topic, createdAt }`. Room list is a fixed 3-entry constant.
- `endHour` must be strictly greater than `startHour`.
- **Conflict check** is the central invariant: for a given `roomId`, no two bookings may overlap on any hour. A multi-hour booking (e.g. 14–16) occupies every hour in its range. Edits re-run the check excluding the booking being edited.
- Deletion requires a confirmation step.
- Data features: export all bookings to JSON, import JSON on the same machine, and "clear all".
- The board must highlight today and the current time / current slot.

The 10 acceptance criteria in `spec.md` §7 are the functional checklist to build and verify against.

## Open assumptions (spec.md §6)

Working hours 09:00–18:00 and room names "會議室 A / B / C" are placeholders — keep them as easily-editable constants.

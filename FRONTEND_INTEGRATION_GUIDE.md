# ExamSpark Frontend Integration Guide

## Project overview

ExamSpark is a frontend-only examination platform demonstration. It contains public marketing and sign-in screens, student exam flows, teacher tools, and administrator screens. All records are local sample data. No authentication, exam, analytics, or admin data is sent to a server.

## Technology and setup

- React 19 and TypeScript
- Vite 8 with the React plugin
- Tailwind CSS 4 through `@tailwindcss/vite`; the product styles are primarily in `src/index.css`
- pnpm, pinned with Node.js 22 and pnpm 10.34.3 in `.mise.toml`

With Node and pnpm available, install and run:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Useful checks and preview commands:

```sh
pnpm run typecheck
pnpm run build
pnpm preview
```

The development server uses port 8443 by default. `PORT` can override it. `vite.config.ts` also reads `.figma/make/site.json` and contains Figma preview/build plugins; keep `.figma/make` and the Vite configuration when maintaining that workflow.

## Source layout

- `index.html` is the Vite document shell.
- `src/main.tsx` mounts React and imports the global stylesheet.
- `src/App.tsx` owns the 16-route hash router and maps routes to page components.
- `src/components/ui.tsx` contains shared `Button`, `Icon`, `Logo`, route/role types, and hash navigation.
- `src/components/workspace.tsx` contains role navigation, the shared `Shell`, `PageTitle`, `Metric`, and the role menu definitions.
- `src/components/useDialogFocus.ts` gives modal dialogs and drawers initial focus, traps Tab within the open dialog, handles Escape when allowed, and restores focus on close.
- `src/pages/Marketing.tsx` and `src/pages/Auth.tsx` contain public and demo sign-in/registration views.
- `src/pages/Student.tsx`, `Attempt.tsx`, and `Results.tsx` contain the student dashboard/catalogue/preparation, attempt, and result experiences.
- `src/pages/Teacher.tsx` contains exam management, question bank, and analytics views.
- `src/pages/Admin.tsx` contains admin overview, user management, oversight, and settings views.
- `src/data.ts` is the typed source for sample exams, questions, and users.
- `src/state.ts` stores the selected exam and most recent demo submission in memory for hash-route navigation. A full page refresh resets it.
- `src/index.css` holds the visual system, responsive rules, and component styles.
- `public/` contains static assets such as the favicon.

## Routes and modules

Routes use the URL hash so each screen can be opened directly without a routing package.

| Area | Hash routes |
| --- | --- |
| Public | `#/` (home), `#/login`, `#/register` |
| Student | `#/student`, `#/discover`, `#/prepare`, `#/attempt`, `#/results` |
| Teacher | `#/teacher`, `#/create`, `#/bank`, `#/analytics` |
| Admin | `#/admin`, `#/users`, `#/oversight`, `#/settings` |

The root URL without a hash also opens the public homepage. Authentication is a role-selection demonstration: submitting the form navigates to the chosen workspace and does not authenticate or create an account.

## Data and demo behavior

`src/data.ts` exports `exams`, `questions`, and `users`. The current student attempt uses the five sample biology multiple-choice questions. Its browser timer, answer selection, review flags, score calculation, and result review demonstrate the interface only; none is authoritative or secure. The sample result is calculated in the browser from the answer key bundled with the frontend.

Search, catalogue status filters, question difficulty filters, and mock user pagination operate on the in-memory sample arrays. Teacher exam/question forms do not save records; their feedback explicitly says the operation was not saved. Import, export, and selected admin actions are unavailable or marked as demonstration-only. Dashboard and analytics metrics are static sample figures and should not be treated as consistent production data.

There is no frontend test framework installed in this project. For this handoff, the existing external Playwright setup was reused without adding a package dependency. The production build and TypeScript checks passed. Headless Chrome exercised all 16 routes, representative student/teacher/admin journeys, and 390px mobile layouts; the checked routes had no horizontal overflow or console/runtime errors.

## Backend integration points

No API endpoints are defined or assumed by this frontend. When backend work begins, introduce typed service modules for the domain operations and have page components consume those services rather than importing sample arrays or writing server responsibilities into UI components. Keep request/response types separate from UI-only view state.

The backend should own:

- Credential verification, account creation, password reset, authorization, and role enforcement.
- Exam/question/user CRUD, scheduling, publication, and durable search/filter/pagination.
- Server-authoritative attempt start/end times, answer saves, submission acceptance, and anti-cheating policy.
- Grading, published results, analytics aggregation, and exports.
- File/import handling and admin actions.

The frontend will need server contracts for exam metadata (identity, status, dates, duration, question count and marks), question choices and grading rules, attempt identity and answer payloads, result breakdowns, and role-scoped user/management data. These are data responsibilities, not existing API shapes. Agree endpoint paths, authorization rules, validation errors, pagination semantics, and retry behavior with the backend team before connecting calls.

When wiring those contracts, replace demo data at the feature boundary (`Student.tsx`, `Attempt.tsx`, `Results.tsx`, `Teacher.tsx`, and `Admin.tsx`) with service calls and loading/error/empty states. Keep `src/state.ts` for transient UI state only; do not treat it as persistence. Authentication state and exam authority must come from server-validated responses.

## Current assumptions and limitations

- Demo sign-in accepts any browser-valid email and a password of at least eight characters; this is only client-side flow validation.
- Data resets on refresh and is shared only within the current page session.
- The countdown and tab-switch notice are demonstrations, not exam security controls.
- Result charts, administrative totals, teacher analytics, and much dashboard activity are static sample figures.
- The settings screen is a placeholder for several backend-owned capabilities.
- Hash routing is intentionally lightweight. Adopt a routing library only if the product needs nested routes, route guards, or richer history behavior.
- There is no server, API client, automated test suite, or real persistence in this delivery.

## Continuing development

1. Use the feature-specific page module and shared components rather than adding another screen to a single application file.
2. Keep shared presentation and keyboard behavior in `src/components`; keep domain sample data in `src/data.ts` until service contracts are agreed.
3. Preserve the current ExamSpark visual identity in `src/index.css`. Verify any layout changes at desktop, tablet, and narrow mobile widths.
4. Add backend service contracts and tests when the backend team provides approved API shapes. Do not infer endpoint URLs from the mock UI.
5. Run `pnpm run typecheck` and `pnpm run build` before handing off frontend changes.

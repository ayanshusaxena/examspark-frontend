# ExamSpark

ExamSpark is a React and TypeScript frontend demonstration of an online examination platform. It presents role-specific experiences for students, teachers, and administrators, alongside public and account-entry screens. The project is intended to communicate product flows and provide a frontend foundation for future backend integration; its current records and interactions are demonstrations only.

## Project overview

The interface illustrates an examination lifecycle: finding and preparing for an exam, completing a timed attempt, reviewing a local result, and managing examination-related views for teaching and administration. The project focuses on:

- Showing how the student, teacher, and administrator workspaces fit into one product.
- Demonstrating key examination and management interactions without requiring a server.
- Keeping pages, shared UI, styling, and sample data organized for continued frontend work.

## Features by role

### Student

- Dashboard with a featured live exam, upcoming exams, recent-result examples, activity, and notices.
- Examination catalogue with text search by title, subject, or code and status filters.
- Preparation screen with examination details, instructions, and an acknowledgement before starting.
- Attempt screen with a question map, multiple-choice selection, a countdown display, review flags, and a submit dialog.
- Results view with a browser-calculated demonstration score, topic breakdown, answer review, and sample result history.

The attempt uses the five sample biology questions in `src/data.ts`. Answers and the selected exam are held in browser memory for the current page session. The timer, answer key, score, and tab-switch warning are not authoritative examination controls.

### Teacher

- Overview dashboard with sample examination and submission metrics.
- Examination management with search and status filters, plus a demonstration creation form.
- Question bank with search, difficulty filtering, and a demonstration question editor.
- Results and analytics view with sample metrics and charts.

Exam/question forms do not save records. Import is unavailable, and result export is disabled until connected data exists.

### Administrator

- Platform overview with sample user and examination totals.
- User management with name/email search, role filtering, and mock pagination.
- Examination oversight with sample ownership and participation rows.
- Settings sections for subjects, announcements, files, audit history, and general settings.

Admin data and totals are examples. User creation, status filtering, and other unconnected actions are unavailable or display demo-only feedback; settings sections are partly placeholders.

### Public and authentication screens

- Public homepage with product overview, role entry points, and responsive navigation.
- Sign-in and registration screens with client-side form checks, role selection for sign-in, and password visibility control.

Submitting these forms only navigates through the demonstration. It does not authenticate a user, create an account, or store credentials.

## Technology stack

- React 19 and TypeScript
- Vite 8 for development and production builds
- Tailwind CSS 4 via `@tailwindcss/vite`, with the product styling in `src/index.css`
- Manrope and DM Mono fonts loaded from Google Fonts
- pnpm for package management

The repository pins Node.js 22 and pnpm 10.34.3 in `.mise.toml`.

## Screenshots

These screenshots were captured from the running frontend with Playwright and headless Chrome. They show sample interface data, not live records.

| Public homepage | Student workspace |
| --- | --- |
| ![ExamSpark public homepage](screenshots/home.png) | ![Student dashboard with featured examination and sample results](screenshots/student-workspace.png) |

| Examination attempt | Teacher workspace |
| --- | --- |
| ![Student multiple-choice attempt with question map and countdown](screenshots/exam-attempt.png) | ![Teacher dashboard with sample examination metrics](screenshots/teacher-workspace.png) |

| Administrator user management |
| --- |
| ![Administrator user management with sample users](screenshots/admin-users.png) |

## Prerequisites

- Node.js 22
- pnpm 10.34.3 (the version pinned in `.mise.toml`)

Use the repository's mise configuration or an equivalent local toolchain to select these versions.

## Installation and local setup

From the project root, install the locked dependencies and start the Vite development server:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Vite uses port `8443` by default. Set `PORT` to use another port. The root URL opens the public homepage; workspace screens are available using the hash routes below.

To build and preview the production bundle:

```sh
pnpm run build
pnpm preview
```

## Available scripts

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the Vite development server. |
| `pnpm run typecheck` | Run the TypeScript compiler without emitting files. |
| `pnpm run build` | Create the production bundle in `dist/`. |
| `pnpm preview` | Serve the previously built bundle locally. |
| `pnpm run format` | Format source files with oxfmt. |

There is no dedicated automated test script or frontend test framework in the project currently.

## Application routes

Routing is hash-based and implemented in `src/App.tsx`. Route fragments use the form `/#route` (for example, `/#student`). The homepage is the root URL without a hash.

| Area | Route |
| --- | --- |
| Public homepage | `/` |
| Sign in | `/#login` |
| Registration | `/#register` |
| Student overview | `/#student` |
| Examination catalogue | `/#discover` |
| Examination preparation | `/#prepare` |
| Examination attempt | `/#attempt` |
| Results and history | `/#results` |
| Teacher overview | `/#teacher` |
| Examination management | `/#create` |
| Question bank | `/#bank` |
| Teacher analytics | `/#analytics` |
| Administrator overview | `/#admin` |
| User management | `/#users` |
| Examination oversight | `/#oversight` |
| Platform settings | `/#settings` |

## Project structure

```text
.
├── .figma/make/           # Figma Make setup, preview, and deployment helpers
├── public/
│   └── favicon.png        # Static favicon
├── screenshots/           # Playwright captures used in this README
├── src/
│   ├── components/        # Shared UI, workspace shell, dialog focus behavior
│   ├── pages/             # Public, student, teacher, and admin page modules
│   ├── App.tsx            # Hash route map
│   ├── data.ts            # Sample exams, questions, and users
│   ├── index.css          # Theme, components, and responsive styles
│   ├── main.tsx           # React entry point
│   └── state.ts           # Ephemeral demo attempt state
├── FRONTEND_INTEGRATION_GUIDE.md
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── vite.config.ts
```

## Architecture and demo data

`src/App.tsx` maps the supported hash routes to feature page components. Shared controls and route types are in `src/components/ui.tsx`; the role-aware sidebar, page headings, and metric cards are in `src/components/workspace.tsx`. Dialog focus handling is shared through `src/components/useDialogFocus.ts`.

Sample exam, question, and user objects are defined in `src/data.ts`. The selected exam and latest demo submission live in `src/state.ts` so the result screen can display the attempt after an in-app route change. This is in-memory UI state; a refresh clears it. Several dashboards and analytics panels also display fixed sample figures.

## Current limitations and backend status

This repository is frontend-only. It has no API client, backend service, database, account system, or server persistence. The available interactions are local interface demonstrations and should not be interpreted as production capabilities.

In particular:

- Sign-in and registration are not real authentication or authorization.
- The attempt countdown and tab-change notice run in the browser and are not security controls.
- The sample answer key is included in the frontend; the score is illustrative, not secure grading.
- Teacher edits and admin operations do not persist. Analytics and many dashboard totals are static examples.
- Import/export and some admin settings/actions require future implementation.
- No automated frontend test suite is configured.

## Future development and backend direction

Agree on API contracts and authorization responsibilities with the backend team before wiring server calls. Likely integration areas include account/session handling, exam and question data, server-managed attempt timing and submission, grading/results, role-scoped management data, and analytics. This repository does not define endpoint paths or response formats.

When contracts are available, move data access behind typed service modules and replace direct sample-data use in the relevant page modules. Keep authentication, authorization, exam timing, answer acceptance, and grading server-authoritative. Add loading, error, and empty states as each service is connected.

## Development and contribution notes

- Keep route additions in `src/App.tsx` and feature UI in the corresponding module under `src/pages/`.
- Prefer the shared components in `src/components/` for consistent controls and workspace layout.
- Preserve the current visual system and responsive rules in `src/index.css` when extending the UI.
- Label mock interactions accurately; do not imply that demo changes are saved.
- Before handing off code changes, run `pnpm run typecheck` and `pnpm run build`, and manually verify affected routes and screen sizes.
- Keep the Figma Make helpers under `.figma/make/` and the Vite configuration if that workflow is still in use.

For source organization, demo boundaries, and detailed backend handoff guidance, see the [Frontend Integration Guide](FRONTEND_INTEGRATION_GUIDE.md).

# Habit Tracker PWA

## Project Overview

A mobile-first Habit Tracker Progressive Web App (PWA) built with Next.js, TypeScript, and Tailwind CSS.

Users can sign up, log in, and manage daily habits — creating, editing, completing, and deleting them. Habit progress is tracked through a streak system, and all data is persisted locally using the browser's localStorage.

The app is installable as a PWA and supports basic offline functionality through service worker caching.

---

## Features

- User authentication (Signup and Login)
- Create, edit, complete, and delete habits
- Streak tracking based on daily completion
- Local data persistence using localStorage
- Installable as a Progressive Web App (PWA)
- Responsive mobile-first design
- Dark theme with indigo/violet color scheme
- Fully tested with unit, integration, and E2E tests

---

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Lucide React Icons
- LocalStorage
- Playwright (E2E Testing)
- Vitest (Unit & Integration Testing)

---

## Repository

```bash
https://github.com/Meet-hybrid/Habit-Tracker.git
```

---

## Project Structure

```text
Habit-Tracker
├── public/
│   ├── icons/
│   │   ├── icon-192.png
│   │   └── icon-512.png
│   ├── manifest.json
│   └── sw.js
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   └── SignupForm.tsx
│   │   ├── habits/
│   │   │   ├── HabitCard.tsx
│   │   │   ├── HabitForm.tsx
│   │   │   └── HabitList.tsx
│   │   └── shared/
│   │       ├── Modal.tsx
│   │       ├── ProtectedRoute.tsx
│   │       ├── ServiceWorkerRegister.tsx
│   │       └── SplashScreen.tsx
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── constants.ts
│   │   ├── habits.ts
│   │   ├── slug.ts
│   │   ├── storage.ts
│   │   ├── streaks.ts
│   │   └── validators.ts
│   └── types/
│       ├── auth.ts
│       └── habit.ts
├── tests/
│   ├── e2e/
│   │   └── app.spec.ts
│   ├── integration/
│   │   ├── auth-flow.test.tsx
│   │   └── habit-form.test.tsx
│   ├── unit/
│   │   ├── habits.test.ts
│   │   ├── slug.test.ts
│   │   ├── streaks.test.ts
│   │   └── validators.test.ts
│   └── setup.ts
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── playwright.config.ts
├── postcss.config.mjs
├── README.md
├── tsconfig.json
└── vitest.config.ts
```

---

## Setup Instructions

Make sure you have Node.js (v18 or later) installed.

1. Clone the repository:

```bash
git clone https://github.com/Meet-hybrid/Habit-Tracker.git
```

2. Navigate into the project folder:

```bash
cd Habit-Tracker
```

3. Install dependencies:

```bash
npm install
```

---

## Run Instructions

1. Start the development server:

```bash
npm run dev
```

2. The app will be available at:

```text
http://localhost:3000
```

3. Build for production:

```bash
npm run build
```

4. Start production server:

```bash
npm run start
```

---

## Test Instructions

### Run all tests

```bash
npm run test
```

### Unit tests

```bash
npm run test:unit
```

### Integration tests

```bash
npm run test:integration
```

### End-to-End (E2E) Tests

```bash
npm run test:e2e
```

---

## Local Persistence Structure

All data is stored in the browser's `localStorage` using these keys:

- `habit-tracker-users` — registered users (id, email, password, createdAt)
- `habit-tracker-session` — active session (userId, email)
- `habit-tracker-habits` — all habits (id, userId, name, description, frequency, createdAt, completions)

---

## PWA Implementation

The app includes a `manifest.json` for installability and a `sw.js` service worker for basic offline caching. The service worker is registered client-side via a dedicated component.

---

## Trade-offs and Limitations

- No backend — all data lives in localStorage and is not shared across devices
- Client-side authentication — passwords stored in localStorage (not suitable for production)
- Basic PWA — no background sync or dynamic data caching
- Not designed for production-scale use

---

## Test Coverage

The project achieves over 90% coverage for core utility logic (habits, validation, slug generation, streak calculation).

| Layer | Files |
|-------|-------|
| Unit | `slug.test.ts`, `validators.test.ts`, `streaks.test.ts`, `habits.test.ts`, `auth.test.ts`, `storage.test.ts` |
| Integration | `auth-flow.test.tsx`, `habit-form.test.tsx` |
| E2E | `app.spec.ts` |

# Parcel Koy — Frontend

Frontend web application for **Parcel Koy** (Parcel Management / Delivery platform).  
This project consumes the REST API provided by **parcel-koy-backend**.

---

## Table of Contents

- [Parcel Koy — Frontend](#parcel-koy--frontend)
  - [Table of Contents](#table-of-contents)
  - [Tech Stack](#tech-stack)
  - [Features (High Level)](#features-high-level)
  - [Project Structure](#project-structure)
  - [Environment Variables](#environment-variables)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Install dependencies](#install-dependencies)
    - [Run development server](#run-development-server)
  - [Scripts](#scripts)
  - [Authentication \& Route Protection](#authentication--route-protection)
  - [API Communication](#api-communication)
  - [UI / Components](#ui--components)
  - [Deployment](#deployment)
  - [Troubleshooting](#troubleshooting)
    - [1) App crashes on startup due to env validation](#1-app-crashes-on-startup-due-to-env-validation)
    - [2) Login redirects loop / unauthorized redirects](#2-login-redirects-loop--unauthorized-redirects)
    - [3) Token refresh not working](#3-token-refresh-not-working)
  - [Related Repository](#related-repository)

---

## Tech Stack

- **Next.js** (App Router) — `next@16.x`
- **React** — `react@19.x`
- **TypeScript**
- **Tailwind CSS** (Tailwind v4) + PostCSS
- **TanStack React Query** — server state / caching
- **TanStack React Table** — data tables
- **TanStack React Form** — forms
- **Axios** — HTTP client
- **Zod** — schema validation
- **@t3-oss/env-nextjs** — type-safe environment variables
- **Radix UI / shadcn/ui** — UI components
- **Recharts** — charts
- **jose** — JWT utilities (client/server token helpers)

---

## Features (High Level)

> Exact features depend on implemented pages, but the project includes infrastructure for:

- Authentication flow (login, verify email, reset password)
- Role-based dashboards (Admin / Merchant / Rider / Common routes)
- Protected routes with automatic redirect handling
- Token refresh mechanism using cookies

---

## Project Structure

Key folders (under `src/`):

- `src/app/`  
  Next.js App Router routes, layouts, and pages.
  - `(common-layout)/` — public/common layout routes
  - `(dashboard-layout)/` — authenticated dashboard routes
  - `layout.tsx`, `error.tsx`, `loading.tsx`, `not-found.tsx`

- `src/actions/`  
  Server actions / async operations (if used).

- `src/components/`  
  Shared UI components (often shadcn/radix-based).

- `src/services/`  
  API service layer (Axios calls to backend).

- `src/lib/`  
  Utilities (auth utils, jwt helpers, token helpers, etc.).

- `src/providers/`  
  App providers (e.g., React Query provider, theme provider).

- `src/hooks/`  
  Custom React hooks.

- `src/types/`  
  Shared TypeScript types/enums (e.g. roles).

- `src/validators/`  
  Zod schemas for validating forms/input.

- `src/constants/`, `src/helpers/`  
  Constants and helper functions.

Other important files:

- `src/env.ts` — env validation + runtime env mapping
- `src/proxy.ts` — route protection + refresh-token middleware/proxy logic
- `components.json` — shadcn/ui config
- `next.config.ts` — Next.js config
- `eslint.config.mjs` — linting rules

---

## Environment Variables

This project uses **type-safe env validation** in `src/env.ts`.

Create a `.env.local` file in the root:

```env
# Public: backend API base URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1

# Server-side secrets / configs (used by middleware/proxy/auth utils)
ACCESS_TOKEN_EXPIRES_IN=15m
OTP_EXPIRES_IN=5m
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

# Stripe / payments redirect URLs (used for clearing due payments)
CLEAR_DUE_PAYMENT_SUCCESS_URL=http://localhost:3000/payments/success
CLEAR_DUE_PAYMENT_CANCEL_URL=http://localhost:3000/payments/cancel
```

> Notes:
>
> - `NEXT_PUBLIC_API_BASE_URL` must be a valid URL.
> - Secrets are used in middleware/proxy JWT verification logic, so they must match backend settings.

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- pnpm (recommended because repo uses pnpm lockfile)

### Install dependencies

```bash
pnpm install
```

### Run development server

```bash
pnpm dev
```

Open:

- http://localhost:3000

---

## Scripts

- `pnpm dev` — start Next.js dev server
- `pnpm build` — build production bundle
- `pnpm start` — start production server
- `pnpm lint` — run ESLint

---

## Authentication & Route Protection

Route protection logic is implemented in `src/proxy.ts` and includes:

- Detecting whether a route is public vs protected
- Redirecting unauthenticated users to `/login?redirectTo=...`
- Redirecting authenticated users away from auth pages (like `/login`) to their default dashboard route
- Enforcing required actions like:
  - email verification (`/verify-email`)
  - password reset handling (`/reset-password`)
- **Auto refresh tokens**:
  - if access token is missing/invalid/expiring soon, it attempts refresh using:
    - `refresh_token`
    - `better-auth.session_token`
  - sets updated cookies on the response

Cookies used (based on proxy logic):

- `access_token`
- `refresh_token`
- `better-auth.session_token`

---

## API Communication

- API calls are handled via the `src/services/` layer.
- Base URL comes from: `NEXT_PUBLIC_API_BASE_URL`.

Recommended convention:

- Keep all HTTP calls inside `src/services/*`
- Use React Query for server state in pages/components

---

## UI / Components

- UI is built using **Tailwind CSS** and component primitives from **Radix UI**
- This repo also includes **shadcn/ui** tooling and configuration (`components.json`)

---

## Deployment

Typical Next.js deployment options:

- Vercel
- Docker + Node server
- Any Node hosting provider

Before deploying:

- Ensure all required env vars are set on the host
- Set cookie/security rules appropriately for HTTPS domains

---

## Troubleshooting

### 1) App crashes on startup due to env validation

`src/env.ts` validates environment variables strictly. Make sure `.env.local` includes all required keys.

### 2) Login redirects loop / unauthorized redirects

- Confirm backend is running and reachable via `NEXT_PUBLIC_API_BASE_URL`
- Confirm cookie settings match your environment:
  - `secure: true` + `sameSite: "none"` requires **HTTPS** in many browsers.
  - For local development, you may need to adjust cookie policy depending on how backend sets cookies.

### 3) Token refresh not working

- Ensure backend refresh endpoint is working
- Ensure `ACCESS_TOKEN_SECRET` matches backend token signing secret

---

## Related Repository

- Backend: **parcel-koy-backend**
  - Provides the REST API used by this frontend.

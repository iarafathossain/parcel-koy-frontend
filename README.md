# ParcelKoy – Frontend

## 🌐 Project Overview

Frontend web application for **ParcelKoy**, a comprehensive Parcel Management and Delivery platform. This project consumes the REST API provided by the `parcel-koy-backend` to deliver a seamless UI for Admins, Merchants, and Riders.

## ✨ Features (High Level)

The project includes robust infrastructure for the following capabilities:

- **Authentication Flow:** Login, email verification, and password reset functionalities.
- **Role-Based Dashboards:** Dedicated, isolated interfaces for Admin, Merchant, and Rider roles.
- **Protected Routes:** Automatic redirect handling for unauthorized access.
- **Token Management:** Built-in token refresh mechanism utilizing cookies.

---

## 🛠 Tech Stack

**Core Framework & Language**

- **Next.js (App Router)** — `next@16.x`
- **React** — `react@19.x`
- **TypeScript** — Strict type checking

**Styling & UI Components**

- **Tailwind CSS (v4) + PostCSS** — Utility-first styling
- **Radix UI / shadcn/ui** — Accessible UI primitives and components
- **Recharts** — Data visualization and charts

**State Management & Data Fetching**

- **TanStack React Query** — Server state, caching, and synchronization
- **Axios** — HTTP client for API communication

**Forms & Tables**

- **TanStack React Form** — Form state management
- **TanStack React Table** — Advanced data grids
- **Zod** — Schema-based form and payload validation

**Utilities**

- **@t3-oss/env-nextjs** — Type-safe environment variables
- **jose** — JWT utilities for client/server token handling

---

## 📂 Project Structure

Key directories inside the `src/` folder:

- `src/app/` — Next.js App Router core (layouts, pages, routing).
- `src/actions/` — Server actions and asynchronous operations.
- `src/components/` — Shared UI components (primarily shadcn/radix-based).
- `src/services/` — API service layer containing Axios calls to the backend.
- `src/lib/` — General utilities (auth, JWT, token helpers).
- `src/providers/` — Application providers (React Query, Theme, etc.).
- `src/hooks/` — Custom React hooks.
- `src/types/` — Shared TypeScript types and enums (e.g., Roles).
- `src/validators/` — Zod schemas for validating forms and inputs.
- `src/constants/` — Static constant values.
- `src/helpers/` — General helper functions.

**Important Configuration Files:**

- `src/env.ts` — Environment validation and runtime mapping.
- `src/proxy.ts` — Route protection and refresh-token middleware/proxy logic.
- `components.json` — shadcn/ui configuration.
- `next.config.ts` — Next.js framework configuration.
- `eslint.config.mjs` — Linting rules.

---

## 🗺 App Routing Structure

Based on the Next.js App Router, the application is divided into common public layouts and protected dashboard layouts:

```text
src/app/
├── (common-layout)/              # Publicly accessible routes
│   ├── (auth-route-group)/       # Authentication flows
│   │   ├── forgot-password/
│   │   ├── login/
│   │   ├── register/
│   │   ├── reset-password/
│   │   └── verify-email/
│   ├── about-us/                 # Static & informational pages
│   ├── contact/
│   ├── coverage/
│   ├── pricing/
│   ├── privacy/
│   ├── services/
│   ├── terms-condition/
│   └── track-parcel/             # Public tracking interface
├── (dashboard-layout)/           # Authenticated & protected routes
│   ├── (common-protected-routes)/
│   │   ├── change-password/
│   │   └── my-profile/
│   ├── admin/dashboard/          # Admin-specific dashboard and tools
│   ├── merchant/                 # Merchant-specific interface
│   └── rider/                    # Rider-specific interface
├── api/                          # Next.js internal API routes
└── error.tsx, layout.tsx, loading.tsx, not-found.tsx # Global UI handlers
```

---

## ⚙️ Environment Variables

This project uses **type-safe environment validation** via `src/env.ts`. Create a `.env.local` file in the root directory:

```env
# Public: Backend API base URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1

# Server-side secrets / configs (Used by middleware/proxy/auth utils)
ACCESS_TOKEN_EXPIRES_IN=15m
OTP_EXPIRES_IN=5m
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

# Stripe / payments redirect URLs
CLEAR_DUE_PAYMENT_SUCCESS_URL=http://localhost:3000/payments/success
CLEAR_DUE_PAYMENT_CANCEL_URL=http://localhost:3000/payments/cancel
```

> **Note:**
>
> - `NEXT_PUBLIC_API_BASE_URL` must be a valid, reachable URL.
> - The `SECRET` variables must exactly match your backend settings, as they are used in the middleware/proxy JWT verification logic.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (LTS recommended)
- **pnpm** (Required, as the repository uses a `pnpm-lock.yaml` file)

### 1\. Install Dependencies

```bash
pnpm install
```

### 2\. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser.

---

## 📜 Available Scripts

- `pnpm dev` — Start Next.js development server.
- `pnpm build` — Build the production bundle.
- `pnpm start` — Start the production server.
- `pnpm lint` — Run ESLint to check for code issues.

---

## 🛡 Authentication & Route Protection

Route protection logic is heavily centralized in `src/proxy.ts`. It handles:

- **Access Control:** Distinguishing between public and protected routes.
- **Unauthenticated Redirects:** Sending logged-out users to `/login?redirectTo=...` when they attempt to access protected pages.
- **Authenticated Redirects:** Sending logged-in users away from auth pages (like `/login`) to their respective default dashboards.
- **Mandatory Actions:** Forcing users to complete required flows like `/verify-email` or `/reset-password`.
- **Auto Refresh Tokens:** Automatically intercepting expiring access tokens and refreshing them using `refresh_token` or `better-auth.session_token`, then attaching updated cookies to the response.

**Core Cookies Managed:**

- `access_token`
- `refresh_token`
- `better-auth.session_token`

---

## 📡 API Communication

- All backend API calls are managed within the `src/services/` layer.
- The base endpoint URL is dynamically pulled from `NEXT_PUBLIC_API_BASE_URL`.
- **Best Practice:** Keep all Axios instances and HTTP calls inside `src/services/*` and utilize TanStack React Query inside components to handle caching, loading, and error states.

---

## 🚨 Troubleshooting

**1. App crashes on startup due to env validation**
`src/env.ts` rigorously checks your environment variables. Ensure your `.env.local` file contains all required keys and correct formats.

**2. Login redirects loop / Unauthorized redirects**

- Verify the backend is running and accessible at the URL defined in `NEXT_PUBLIC_API_BASE_URL`.
- Check your browser's cookie settings. Configurations like `secure: true` and `sameSite: "none"` require an active **HTTPS** connection in most modern browsers. For local development, adjust your cookie policies accordingly.

**3. Token refresh not working**

- Confirm the backend's refresh endpoint is active and functioning.
- Ensure the frontend `ACCESS_TOKEN_SECRET` exactly matches the backend's signing secret.

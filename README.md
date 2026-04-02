# ParcelKoy – Frontend

## Links

- Frontend Repo: https://github.com/iarafathossain/parcel-koy-frontend
- Frontend Live: https://parcel-koy-frontend.vercel.app/

## Demo Access (Super Admin)

- Email: superadmin@parcelkoy.com
- Password: SuperAdmin@123

## Delivery OTP Note

- Use common OTP: `1234` for confirming delivery.

---

## Project Overview

ParcelKoy Frontend is a role-based parcel delivery management UI built with Next.js App Router.
It consumes the ParcelKoy backend REST API and provides separate workflows for:

- Super Admin / Admin
- Merchant
- Rider

Core areas include authentication, dashboard analytics, parcel operations, pricing rules, payouts, transactions, and cash collections.

---

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript (strict)
- Tailwind CSS v4
- shadcn/ui + Radix UI
- TanStack React Query
- TanStack React Form
- TanStack React Table
- Zod
- Recharts
- Axios
- jose
- @t3-oss/env-nextjs

---

## App Routing Structure

Based on the current `src/app` structure.

```text
src/app/
├── layout.tsx
├── loading.tsx
├── error.tsx
├── not-found.tsx
├── api/
│   └── auth/
│       └── me/route.ts
├── (common-layout)/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about-us/page.tsx
│   ├── contact/page.tsx
│   ├── coverage/page.tsx
│   ├── pricing/page.tsx
│   ├── privacy/page.tsx
│   ├── services/page.tsx
│   ├── terms-condition/page.tsx
│   ├── track-parcel/page.tsx
│   ├── track-parcel/[trackingId]/page.tsx
│   └── (auth-route-group)/
│       ├── login/page.tsx
│       ├── register/page.tsx
│       ├── forgot-password/page.tsx
│       ├── reset-password/page.tsx
│       └── verify-email/page.tsx
└── (dashboard-layout)/
    ├── layout.tsx
    ├── (common-protected-routes)/
    │   ├── loading.tsx
    │   ├── my-profile/
    │   │   ├── page.tsx
    │   │   └── loading.tsx
    │   └── change-password/
    │       ├── page.tsx
    │       └── loading.tsx
    ├── admin/
    │   └── dashboard/
    │       ├── layout.tsx
    │       ├── page.tsx
    │       ├── loading.tsx
    │       ├── admins-management/page.tsx
    │       ├── merchants-management/page.tsx
    │       ├── riders-management/page.tsx
    │       ├── parcels-management/page.tsx
    │       ├── categories-management/page.tsx
    │       ├── methods-management/page.tsx
    │       ├── speeds-management/page.tsx
    │       ├── zones-management/page.tsx
    │       ├── areas-management/page.tsx
    │       ├── hubs-management/page.tsx
    │       ├── pricing-management/page.tsx
    │       ├── merchant-payouts/page.tsx
    │       ├── transactions/page.tsx
    │       ├── cash-collections/page.tsx
    │       └── finance-management/page.tsx
    ├── merchant/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── loading.tsx
    │   ├── create-parcel/page.tsx
    │   ├── my-parcels/page.tsx
    │   ├── my-payments/page.tsx
    │   ├── my-payments/stripe-connect/verify/page.tsx
    │   └── payment-cancel/page.tsx
    └── rider/
        └── dashboard/
            ├── layout.tsx
            ├── page.tsx
            ├── loading.tsx
            └── assigned-parcels/page.tsx
```

---

## Environment Variables

Create `.env.local` in project root:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

OTP_EXPIRES_IN=5m
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

CLEAR_DUE_PAYMENT_SUCCESS_URL=http://localhost:3000/payment-success
CLEAR_DUE_PAYMENT_CANCEL_URL=http://localhost:3000/payment-cancel
```

Notes:

- `NEXT_PUBLIC_API_BASE_URL` should be the backend server origin (do not append `/api/v1` because endpoint constants already include it).
- `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` must match backend secrets used for token verification.

---

## Getting Started

### Prerequisites

- Node.js (LTS)
- pnpm

### Install

```bash
pnpm install
```

### Run Dev Server

```bash
pnpm dev
```

Open: http://localhost:3000

---

## Scripts

- `pnpm dev` — Start dev server
- `pnpm build` — Build production app
- `pnpm start` — Run production server
- `pnpm lint` — Run ESLint

---

## Authentication & Route Protection

Main auth/protection logic is handled in:

- `src/proxy.ts`

It handles:

- Public vs protected route guarding
- Redirect to login when unauthenticated
- Redirect away from auth pages when already authenticated
- Mandatory flows (`/verify-email`, `/change-password`, etc.)
- Token refresh flow and cookie synchronization

Primary auth cookies:

- `access_token`
- `refresh_token`
- `better-auth.session_token`

---

## API Layer Convention

- `src/services/*` contains backend API calls
- `src/actions/*` wraps service methods for server actions
- Components call actions and manage UI state with React Query

---

## Troubleshooting

### Env validation issues

Check `src/env.ts` and ensure all required env keys exist with correct format.

### Redirect loop or unauthorized access

- Verify backend URL in `NEXT_PUBLIC_API_BASE_URL`
- Confirm cookies are being set and sent correctly
- Make sure frontend secrets match backend signing secrets

### Refresh flow issues

- Confirm backend refresh endpoint works
- Confirm session + refresh cookies are present
- Check `src/proxy.ts` and `src/app/api/auth/me/route.ts` logic and response statuses

## Ownership

All right belongs to Arafat Hossain.

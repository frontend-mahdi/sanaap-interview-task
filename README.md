# Negotiant Registration — Insurance Agent Signup Form

<p align="center">
  <img src="https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" alt="TanStack Query" />
  <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white" alt="Zod" />
</p>

<p align="center">
  A single-page application (SPA) for registering insurance agents of the DEY insurance company — fully responsive, RTL, with dark/light mode support.
</p>

---

## 📋 Table of Contents

- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation & Running](#-installation--running)
- [Scripts](#-scripts)
- [Project Structure](#-project-structure)
- [Architecture & Layering](#-architecture--layering)
- [Server-Side Validation with Zod](#-server-side-validation-with-zod)
- [Server State Management with TanStack Query](#-server-state-management-with-tanstack-query)
- [API Documentation](#-api-documentation)
- [Form & Validation Logic](#-form--validation-logic)
- [Configuration](#-configuration)
- [Dark / Light Mode](#-dark--light-mode)
- [Coding Standards](#-coding-standards)
- [Deployment](#-deployment)

---

## ✨ Features

- **Agent registration form** built with React Hook Form and full Zod-based validation
- **Smart agency code check**: as soon as the user types a code, it is sent to the server with a 600ms debounce; if the code is already taken, the Persian error message received from `error_details.fa_details` is displayed below the field and wired into React Hook Form's error state — preventing the signup API from ever being called with an invalid code
- **Dependent province / city selects**: the city list stays disabled until a province is chosen, then loads from the province-specific API
- **Searchable insurance branch select**: server-side search with `name`, `province` and `insurance=DEY` query params, combined with `useDeferredValue` for a smooth typing experience
- **Combined landline phone input**: area code (25%) and number (75%) side by side in one row under a single shared label
- **Mobile number field**: separate 11-digit field validated as `09xxxxxxxxx`
- **Real / Legal entity type radio**: selecting "Legal" conditionally shows and validates an extra "Agency Name" input
- **First / Last name fields**: required personal information fields included in the final payload
- **Clean fetch-based service layer**: network logic fully separated from components (Single Responsibility Principle)
- **Server responses validated with Zod before reaching the UI**: every API response is parsed against a Zod schema; invalid data never reaches a component
- **Server state managed by TanStack Query**: caching, deduplication and race-condition handling out of the box
- **App-level Error Boundary**: prevents a full app crash and shows a localized error UI with a retry button
- **JWT token output**: a successful signup returns `access` and `refresh` tokens, validated by Zod and displayed on the success screen
- **Dark / light mode**: user choice persisted in `localStorage`, with automatic system-preference detection
- **Fully responsive**: mobile-first design with Tailwind CSS
- **Full RTL layout** with the Persian Vazirmatn font

---

## 🧰 Prerequisites

| Tool | Recommended Version |
|---|---|
| Node.js | 18+ |
| pnpm | 8+ |

---

## 🚀 Installation & Running

```bash
# 1. Install dependencies
pnpm install

# 2. Start the development server
pnpm dev
```

Then open your browser at:

```
http://localhost:5173
```

---

## 📜 Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the dev server with Hot Reload |
| `pnpm build` | Build for production (output in `dist/`) |
| `pnpm preview` | Preview the production build locally |
| `pnpm lint` | Lint the codebase with ESLint |
| `pnpm typecheck` | Type-check with TypeScript (optional) |

---

## 📂 Project Structure

```
src/
├── config/
│   └── constants.ts              # Base API URL, endpoints, constants (DEY, debounce)
├── lib/
│   └── apiClient.ts              # Centralized fetch client + ApiError class
├── schemas/
│   ├── apiSchemas.ts             # Zod schemas for server responses (Envelope, Province, County, ...)
│   └── formSchema.ts             # Zod schema for the form + conditional validation
├── services/
│   ├── agencyCodeService.ts      # POST agency code uniqueness check
│   ├── locationService.ts        # GET provinces & counties
│   ├── insuranceBranchService.ts # GET insurance branch list
│   └── signupService.ts          # POST signup + form-to-payload mapper
├── hooks/
│   ├── useProvinces.ts           # useQuery for provinces
│   ├── useCounties.ts            # useQuery for counties (dependent on province)
│   ├── useInsuranceBranches.ts   # useQuery for searchable branches
│   ├── useCheckAgencyCode.ts     # useQuery for duplicate code check
│   ├── useSignup.ts              # useMutation for final signup
│   ├── useDebouncedValue.ts      # Generic debounce hook
│   └── useTheme.ts               # Dark/light mode hook
├── components/
│   ├── ErrorBoundary.tsx         # App-level error boundary
│   ├── ThemeToggle.tsx           # Theme switch button
│   ├── ui/
│   │   └── Field.tsx             # Label/error wrapper + shared input classes
│   └── form/
│       ├── AgentCodeField.tsx
│       ├── LocationFields.tsx
│       ├── InsuranceBranchSelect.tsx
│       ├── PhoneField.tsx        # Landline (area code + number) + mobile number
│       └── NegotiantTypeField.tsx
├── pages/
│   └── RegistrationForm.tsx      # Main form page
├── App.tsx
├── main.tsx                      # QueryClientProvider setup
└── index.css
```

---

## 🏗 Architecture & Layering

The project is organized into four layers based on **SOLID** principles and Separation of Concerns:

```
UI Components  →  Hooks (TanStack Query)  →  Services  →  apiClient (fetch)
      ↑                                                        ↓
      └────────── Zod Validation (before UI) ←─────────────────┘
```

| Layer | Responsibility | Forbidden |
|---|---|---|
| **Components** | Render UI and connect to hooks | Direct access to `fetch` |
| **Hooks** | Server state management via TanStack Query | Building URLs or parsing data |
| **Services** | One independent function per endpoint + Zod validation | Any React dependency |
| **apiClient** | Centralize fetch, headers and error handling | Knowing any business details |

> Key benefit: swapping `fetch` for axios, or changing any endpoint, happens only inside the Service layer — no component is affected (Open/Closed Principle).

---

## 🔒 Server-Side Validation with Zod

Every server response is **parsed with a Zod schema before it reaches the components**:

```ts
// Example: insurance branches response wrapped in the Envelope structure
const parsed = insuranceBranchesSchema.parse(data); // ZodError on invalid data
return parsed.response;                             // only validated data reaches the UI
```

The v2 Envelope response structure:

```json
{
  "status_code": 200,
  "message": "Request fulfilled, document follows",
  "is_success": true,
  "error_details": null,
  "response": {}
}
```

On error (e.g. duplicate agency code with a 400 status), the `ApiError` class extracts the Persian message from `error_details.fa_details` and throws it so it can be rendered directly under the related form field — registered through `setError` so React Hook Form blocks submission.

---

## ⚙️ Server State Management with TanStack Query

| Hook | Query Key | Key Notes |
|---|---|---|
| `useProvinces` | `["provinces"]` | `staleTime: Infinity` — static data, fetched once |
| `useCounties` | `["counties", provinceId]` | `enabled` only when a province is selected; cache resets between provinces |
| `useInsuranceBranches` | `["insurance-branches", provinceId, search]` | `placeholderData` prevents a blank flash while typing |
| `useCheckAgencyCode` | `["agency-code", agentCode]` | `retry: false` — a 400 means "duplicate code", not a network failure |
| `useSignup` | Mutation | No automatic retry, to prevent duplicate registrations |

Request deduplication, caching and race-condition handling are managed automatically by TanStack Query.

---

## 🌐 API Documentation

Base domain: `https://stage-api.sanaap.co` (configurable in `src/config/constants.ts`)

| # | Method | Endpoint | Description |
|---|---|---|---|
| 1 | `POST` | `/api/v2/app/DEY/agent/verification/signup/check_agency_code/` | Check agency code uniqueness |
| 2 | `GET` | `/base/provinces_wop/` | List of provinces (raw array) |
| 3 | `GET` | `/base/counties_wop/?province={id}` | List of counties for a province |
| 4 | `GET` | `/api/v2/app/selection_item/insurance_branch/wop_list/?name={q}&province={id}&insurance=DEY` | Search insurance branches |
| 5 | `POST` | `/api/v2/app/DEY/agent/verification/signup/` | Final signup |

**Final signup body:**

```json
{
  "Address": "...",
  "agency_type": "real | legal",
  "agent_code": "...",
  "city_code": "...",
  "phone": "...",
  "phone_number": "...",
  "province": "...",
  "county": "...",
  "first_name": "...",
  "last_name": "...",
  "insurance_branch": "...",
  "name": "only for legal entities"
}
```

> Field mapping: `city_code` ← landline area code, `phone` ← landline number, `phone_number` ← mobile number.

**Success response (status 200):**

```json
{
  "status_code": 200,
  "is_success": true,
  "error_details": null,
  "response": {
    "refresh": "<JWT refresh token>",
    "access": "<JWT access token>"
  }
}
```

**Error response (duplicate code — status 400):**

```json
{
  "status_code": 400,
  "is_success": false,
  "error_details": {
    "type": "validation_error",
    "code": "agent_code_unique",
    "fa_details": "کد نمایندگی 123 قبلا ثبت شده است"
  }
}
```

---

## 📝 Form & Validation Logic

| Field | Key | Rules |
|---|---|---|
| Agency Code | `agent_code` | Required + server-side uniqueness check (600ms debounce) |
| First Name | `first_name` | Required |
| Last Name | `last_name` | Required |
| Province | `province` | Required — drives the city list |
| City | `county` | Required — disabled until a province is selected |
| Address | `Address` | Required — textarea with 4 rows |
| Insurance Branch | `insurance_branch` | Required — picked from the searchable list |
| Landline Area Code | `phone` | 2–4 digits |
| Landline Number | `phone_number` | 7–8 digits |
| Mobile Number | `mobile_number` | 11 digits, must match `^09\d{9}$` |
| Entity Type | `agency_type` | `real` / `legal` — defaults to `real` |
| Agency Name | `name` | Required only for `legal` (conditional validation via `superRefine`) |

All error messages are in Persian, displayed below the related field in the secondary color (`#d31853`). A server-side error on the agency code check is merged into React Hook Form's error state and blocks the signup API call.

---

## ⚙️ Configuration

All project constants are centralized in one place — `src/config/constants.ts`:

```ts
export const BASE_API_URL = "https://stage-api.sanaap.co";
export const API_ENDPOINTS = { ... } as const;
export const INSURANCE = "DEY";
export const DEBOUNCE_MS = 600;
```

Color palette defined in `tailwind.config.js`:

| Token | Value | Usage |
|---|---|---|
| `primary` | `#008e9c` | Buttons, headings, input focus rings |
| `secondary` | `#d31853` | Error messages and the theme toggle |

---

## 🌓 Dark / Light Mode

- Initial theme detected from the OS preference (`prefers-color-scheme`)
- User choice persisted in `localStorage` under the key `negotiant-theme`
- The `dark` class is toggled on `<html>`, with `darkMode: "class"` configured in Tailwind

---

## 🧭 Coding Standards

- **TypeScript Strict Mode** — no `any`
- **Small, single-purpose components** — each complex field is its own component
- **Descriptive naming** — hooks prefixed with `use`, services suffixed with `Service`
- **Stale responses neutralized** — outdated search results are handled via `placeholderData` and TanStack Query race management
- **All user-facing messages in Persian** — raw technical errors are never shown to the user

---

## 🚢 Deployment

```bash
# Build for production
pnpm build

# The dist/ output is ready to deploy on any static host:
# Vercel / Netlify / Cloudflare Pages / Nginx
pnpm preview   # local preview before publishing
```

---

## 🧑‍💻 Developer

Interview task project "Negotiant Registration" — built with ❤️ and React.
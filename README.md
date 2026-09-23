# Negotiant Registration | فرم ثبت‌نام نمایندگی

<p align="center">
  <img src="https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" alt="TanStack Query" />
  <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white" alt="Zod" />
</p>

<p align="center">
  پروژه‌ی تک‌صفحه‌ای (SPA) برای ثبت‌نام نمایندگی بیمه دی (DEY) — کاملاً راست‌به‌چپ، ریسپانسیو و با پشتیبانی از حالت شب و روز.
</p>

---

## 📋 فهرست مطالب

- [ویژگی‌ها](#-ویژگیها)
- [پیش‌نیازها](#-پیشنیازها)
- [نصب و اجرا](#-نصب-و-اجرا)
- [اسکریپت‌ها](#-اسکریپتها)
- [ساختار پروژه](#-ساختار-پروژه)
- [معماری و لایه‌بندی](#-معماری-و-لایهبندی)
- [اعتبارسنجی سرور با Zod](#-اعتبارسنجی-سرور-با-zod)
- [مدیریت وضعیت سرور با TanStack Query](#-مدیریت-وضعیت-سرور-با-tanstack-query)
- [مستندات API](#-مستندات-api)
- [فرم و منطق اعتبارسنجی](#-فرم-و-منطق-اعتبارسنجی)
- [پیکربندی](#-پیکربندی)
- [حالت شب و روز](#-حالت-شب-و-روز)
- [استانداردهای کدنویسی](#-استانداردهای-کدنویسی)
- [استقرار (Deployment)](#-استقرار-deployment)

---

## ✨ ویژگی‌ها

- **فرم ثبت‌نام نمایندگی** با React Hook Form و اعتبارسنجی کامل مبتنی بر Zod
- **بررسی هوشمند کد نمایندگی**: به‌محض ورود کد، با debounce ۶۰۰ms به سرور ارسال و در صورت تکراری بودن، خطای فارسی دریافتی از `error_details.fa_details` زیر فیلد نمایش داده می‌شود
- **انتخاب استان و شهر وابسته**: لیست شهرها تا انتخاب استان غیرفعال است و از API اختصاصی هر استان بارگذاری می‌شود
- **انتخابگر جستجودار شعبه بیمه**: جستجوی سمت سرور با پارامترهای `name`، `province` و `insurance=DEY` همراه با `useDeferredValue` برای پاسخ‌گویی روان رابط کاربری
- **تلفن ثابت ترکیبی**: کد (۲۵٪) و شماره (۷۵٪) در یک ردیف با یک لیبل مشترک
- **نوع نمایندگی حقیقی/حقوقی**: با انتخاب «حقوقی» فیلد «نام نمایندگی» به‌صورت شرطی نمایش و اعتبارسنجی می‌شود
- **لایه‌ی سرویس تمیز مبتنی بر fetch**: جداسازی کامل منطق شبکه از کامپوننت‌ها (اصل تک‌وظیفه‌ای — SRP)
- **اعتبارسنجی پاسخ سرور قبل از رسیدن به UI**: همه‌ی خروجی‌های API با اسکیمای Zod پارس می‌شوند؛ داده‌ی نامعتبر هرگز به کامپوننت‌ها نمی‌رسد
- **مدیریت وضعیت سرور با TanStack Query**: کش، حذف درخواست‌های تکراری و هم‌زمانی (deduplication) خودکار
- **Error Boundary در سطح اپلیکیشن**: جلوگیری از Crash کل برنامه و نمایش UI خطای فارسی با امکان تلاش مجدد
- **حالت شب/روز** با ذخیره‌سازی انتخاب کاربر در `localStorage` و تشخیص خودکار تنظیمات سیستم
- **کاملاً ریسپانسیو**: طراحی Mobile-First با Tailwind CSS
- **RTL کامل** با فونت فارسی Vazirmatn

---

## 🧰 پیش‌نیازها

| ابزار | نسخه پیشنهادی |
|---|---|
| Node.js | 18+ |
| pnpm | 8+ |

---

## 🚀 نصب و اجرا

```bash
# ۱. نصب وابستگی‌ها
pnpm install

# ۲. اجرای محیط توسعه
pnpm dev
```

سپس مرورگر را روی آدرس زیر باز کنید:

```
http://localhost:5173
```

---

## 📜 اسکریپت‌ها

| دستور | توضیح |
|---|---|
| `pnpm dev` | اجرای سرور توسعه با Hot Reload |
| `pnpm build` | ساخت نسخه‌ی Production (خروجی در `dist/`) |
| `pnpm preview` | پیش‌نمایش محلی نسخه‌ی Production |
| `pnpm lint` | بررسی کیفیت کد با ESLint |
| `pnpm typecheck` | بررسی تایپ‌ها با TypeScript (اختیاری) |

---

## 📂 ساختار پروژه

```
src/
├── config/
│   └── constants.ts              # آدرس پایه API، اندپوینت‌ها و ثابت‌ها (DEY, debounce)
├── lib/
│   └── apiClient.ts              # کلاینت fetch متمرکز + کلاس ApiError
├── schemas/
│   ├── apiSchemas.ts             # اسکیمای Zod پاسخ‌های سرور (Envelope, Province, County, ...)
│   └── formSchema.ts             # اسکیمای Zod فرم + اعتبارسنجی شرطی
├── services/
│   ├── agencyCodeService.ts      # POST بررسی کد نمایندگی
│   ├── locationService.ts        # GET استان‌ها و شهرها
│   ├── insuranceBranchService.ts # GET لیست شعب بیمه
│   └── signupService.ts          # POST ثبت‌نام + Mapper فرم به Payload
├── hooks/
│   ├── useProvinces.ts           # useQuery استان‌ها
│   ├── useCounties.ts            # useQuery شهرهای وابسته به استان
│   ├── useInsuranceBranches.ts   # useQuery شعب با جستجو
│   ├── useCheckAgencyCode.ts     # useQuery بررسی تکراری بودن کد
│   ├── useSignup.ts              # useMutation ثبت‌نام
│   ├── useDebouncedValue.ts      # هوک debounce عمومی
│   └── useTheme.ts               # هوک حالت شب/روز
├── components/
│   ├── ErrorBoundary.tsx         # مرز خطا در سطح اپلیکیشن
│   ├── ThemeToggle.tsx           # دکمه تغییر تم
│   ├── ui/
│   │   └── Field.tsx             # کامپوننت لیبل/خطا + کلاس‌های مشترک input
│   └── form/
│       ├── AgentCodeField.tsx
│       ├── LocationFields.tsx
│       ├── InsuranceBranchSelect.tsx
│       ├── PhoneField.tsx
│       └── NegotiantTypeField.tsx
├── pages/
│   └── RegistrationForm.tsx      # صفحه اصلی فرم
├── App.tsx
├── main.tsx                      # راه‌اندازی QueryClientProvider
└── index.css
```

---

## 🏗 معماری و لایه‌بندی

پروژه بر اساس اصول **SOLID** و جداسازی دغدغه‌ها (Separation of Concerns) در چهار لایه سازمان‌دهی شده است:

```
UI Components  →  Hooks (TanStack Query)  →  Services  →  apiClient (fetch)
      ↑                                                        ↓
      └────────── Zod Validation (قبل از UI) ←──────────────────┘
```

| لایه | مسئولیت | ممنوعیت |
|---|---|---|
| **Components** | رندر UI و اتصال به هوک‌ها | دسترسی مستقیم به `fetch` |
| **Hooks** | مدیریت وضعیت سرور با TanStack Query | شامل منطق ساخت URL یا پارس |
| **Services** | هر اندپوینت = یک تابع مستقل + اعتبارسنجی Zod | وابسته به React |
| **apiClient** | متمرکزسازی fetch، هدرها، Error Handling | دانستن جزئیات بیزینسی |

> مزیت کلیدی: تعویض `fetch` با axios یا تغییر هر اندپوینت فقط در لایه‌ی Service انجام می‌شود و هیچ کامپوننتی تحت تأثیر قرار نمی‌گیرد (اصل باز-بسته — OCP).

---

## 🔒 اعتبارسنجی سرور با Zod

تمام پاسخ‌های سرور **قبل از رسیدن به کامپوننت‌ها** با اسکیمای Zod پارس می‌شوند:

```ts
// مثال: پاسخ شعب بیمه با ساختار Envelope
const parsed = insuranceBranchesSchema.parse(data); // ZodError در صورت داده نامعتبر
return parsed.response;                             // فقط داده‌ی تاییدشده به UI می‌رسد
```

ساختار پوشش (Envelope) پاسخ‌های v2:

```json
{
  "status_code": 200,
  "message": "Request fulfilled, document follows",
  "is_success": true,
  "error_details": null,
  "response": []
}
```

در صورت خطا (مثلاً کد تکراری با status 400)، کلاس `ApiError` پیام فارسی را از مسیر `error_details.fa_details` استخراج و پرتاب می‌کند تا مستقیماً زیر فیلد مربوطه نمایش داده شود.

---

## ⚙️ مدیریت وضعیت سرور با TanStack Query

| هوک | Query Key | نکات کلیدی |
|---|---|---|
| `useProvinces` | `["provinces"]` | `staleTime: Infinity` — داده‌ی ثابت، فقط یک بار fetch |
| `useCounties` | `["counties", provinceId]` | `enabled` فقط با انتخاب استان + ریست خودکار کش بین استان‌ها |
| `useInsuranceBranches` | `["insurance-branches", provinceId, search]` | `placeholderData` برای جلوگیری از فلش خالی هنگام تایپ |
| `useCheckAgencyCode` | `["agency-code", agentCode]` | `retry: false` — خطای ۴۰۰ یعنی «کد تکراری»، نه خطای شبکه |
| `useSignup` | Mutation | بدون retry خودکار برای جلوگیری از ثبت تکراری |

حذف درخواست‌های تکراری (deduplication)، کش و هم‌زمانی درخواست‌ها به‌طور خودکار توسط React Query مدیریت می‌شود.

---

## 🌐 مستندات API

دامنه پایه: `https://stage-api.sanaap.co` (قابل تغییر از `src/config/constants.ts`)

| # | متد | اندپوینت | توضیح |
|---|---|---|---|
| ۱ | `POST` | `/api/v2/app/DEY/agent/verification/signup/check_agency_code/` | بررسی تکراری بودن کد نمایندگی |
| ۲ | `GET` | `/base/provinces_wop/` | لیست استان‌ها (آرایه خام) |
| ۳ | `GET` | `/base/counties_wop/?province={id}` | لیست شهرهای یک استان |
| ۴ | `GET` | `/api/v2/app/selection_item/insurance_branch/wop_list/?name={q}&province={id}&insurance=DEY` | جستجوی شعب بیمه |
| ۵ | `POST` | `/api/v2/app/DEY/agent/verification/signup/` | ثبت‌نام نهایی |

**Body ثبت‌نام نهایی:**

```json
{
  "Address": "...",
  "agency_type": "real | legal",
  "agent_code": "...",
  "city_code": "...",
  "phone": "...",
  "province": "...",
  "county": "...",
  "insurance_branch": "...",
  "name": "فقط برای نمایندگی حقوقی"
}
```

> فیلدهای `first_name`, `last_name`, `phone_number` در نسخه‌ی فعلی UI پیاده‌سازی نشده‌اند و پس از مشخص شدن الزام، به فرم و `mapFormToSignupPayload` اضافه خواهند شد.

**نمونه پاسخ خطا (کد تکراری — status 400):**

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

## 📝 فرم و منطق اعتبارسنجی

| فیلد | کلید | قواعد |
|---|---|---|
| کد نمایندگی | `agent_code` | الزامی + بررسی یکتایی سمت سرور (debounce ۶۰۰ms) |
| استان | `province` | الزامی — پیش‌فرض غیرفعال نیست، شهر وابسته به آن است |
| شهر | `county` | الزامی — تا انتخاب استان غیرفعال |
| آدرس | `Address` | الزامی — textarea با ۴ سطر |
| شعبه بیمه | `insurance_branch` | الزامی — انتخاب از لیست جستجودار |
| کد تلفن ثابت | `phone` | ۲ تا ۴ رقم عددی |
| شماره تلفن ثابت | `phone_number` | ۷ تا ۸ رقم عددی |
| نوع نمایندگی | `agency_type` | `real` / `legal` — پیش‌فرض `real` |
| نام نمایندگی | `name` | فقط برای `legal` الزامی (اعتبارسنجی شرطی با `superRefine`) |

پیام‌های خطا همگی فارسی و در زیر فیلد مربوطه (رنگ `#d31853`) نمایش داده می‌شوند.

---

## ⚙️ پیکربندی

تمام ثابت‌های پروژه در یک نقطه متمرکز است — `src/config/constants.ts`:

```ts
export const BASE_API_URL = "https://stage-api.sanaap.co";
export const API_ENDPOINTS = { ... } as const;
export const INSURANCE = "DEY";
export const DEBOUNCE_MS = 600;
```

رنگ‌بندی اصلی در `tailwind.config.js`:

| توکن | مقدار | کاربرد |
|---|---|---|
| `primary` | `#008e9c` | دکمه‌ها، تیترها، فوکوس اینپوت‌ها |
| `secondary` | `#d31853` | پیام‌های خطا و دکمه تغییر تم |

---

## 🌓 حالت شب و روز

- تشخیص اولیه از تنظیمات سیستم (`prefers-color-scheme`)
- ذخیره انتخاب کاربر در `localStorage` با کلید `negotiant-theme`
- اعمال کلاس `dark` روی `<html>` و پیکربندی `darkMode: "class"` در Tailwind

---

## 🧭 استانداردهای کدنویسی

- **TypeScript Strict Mode** — بدون `any`
- **کامپوننت‌های کوچک و تکی‌وظیفه** — هر فیلد پیچیده، یک کامپوننت مستقل
- **نام‌گذاری توصیفی** — هوک‌ها با پیشوند `use`، سرویس‌ها با پسوند `Service`
- **لغو درخواست‌های منسوخ** — پاسخ‌های قدیمی جستجو با `placeholderData` و مدیریت TanStack Query بی‌اثر می‌شوند
- **پیام‌های کاربر همگی فارسی** — خطاهای فنی هرگز مستقیم به کاربر نمایش داده نمی‌شوند

---

## 🚢 استقرار (Deployment)

```bash
# ساخت نسخه نهایی
pnpm build

# خروجی در پوشه dist/ آماده انتشار روی هر هاست استاتیک است:
# Vercel / Netlify / Cloudflare Pages / Nginx
pnpm preview   # پیش‌نمایش محلی قبل از انتشار
```

---

## 🧑‍💻 توسعه‌دهنده

پروژه‌ی مصاحبه‌ای «ثبت‌نام نمایندگی» — ساخته‌شده با ❤️ و React.
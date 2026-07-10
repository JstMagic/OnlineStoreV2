# OnlineStoreV2 — Agent Context

This file is the project's working memory. The coding agent reads it BEFORE every change and
appends to the log AFTER, so changes stay consistent as the project grows. Keep durable
conventions and decisions here.

## Stack

- Next.js + NestJS + Tailwind

## Conventions

- `npm run verify` (install + type-check + lint) must pass before a change is done.
- TypeScript is strict and `any` is banned — use precise types, or `unknown` + narrowing.
- Extend the existing module/page structure; keep the security baseline (validation, headers, etc.).
- Build features end-to-end and wire them so they actually run (migrations applied, frontend↔API connected).

## Architecture decisions

_None recorded yet._

## Project log

- 2026-07-10: fix it — apps/api/src/app.module.ts, apps/api/src/modules/orders/dto/create-order.dto.ts, apps/web/components/CheckoutForm.tsx
- 2026-07-07: Create a visually appealing online store using Next.js, NestJS, and Tailwind CSS. This should not be a full enterprise e-commerce platform,  — apps/api/src/interfaces/index.ts, apps/api/src/main.ts, apps/api/src/mock-data/categories.ts, apps/api/src/mock-data/products.ts, apps/api/src/modules/cart/cart.controller.ts, apps/api/src/modules/cart/cart.module.ts, apps/api/src/modules/cart/cart.service.ts, apps/api/src/modules/cart/dto/add-to-cart.dto.ts

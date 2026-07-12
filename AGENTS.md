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

- 2026-07-12: The app BUILT successfully but the deployed container never becomes HEALTHY (it crashes at startup, or it runs but fails the load-balancer h — apps/web/next.config.js
- 2026-07-12: The app BUILT successfully but the deployed container never becomes HEALTHY (it crashes at startup, or it runs but fails the load-balancer h — apps/api/src/config/env.validation.ts
- 2026-07-12: The app BUILT successfully but the deployed container never becomes HEALTHY (it crashes at startup, or it runs but fails the load-balancer h — apps/api/src/main.ts, scripts/start.js
- 2026-07-11: The deployed container crash-loops. The logs show: Error: Cannot find module '/app/apps/web/server.js' (MODULE_NOT_FOUND), exit code 1. Two  — Dockerfile, scripts/start.js
- 2026-07-10: The deploy build for this app FAILED. Fix the code so it builds cleanly inside a container (no network and no running backend/database at bu — apps/web/app/order-confirmation/OrderConfirmationClient.tsx, apps/web/app/order-confirmation/page.tsx, apps/web/app/page.tsx, apps/web/next-env.d.ts
- 2026-07-10: try to fix the deployment issue — apps/web/next.config.js
- 2026-07-10: fix it — apps/api/src/app.module.ts, apps/api/src/modules/orders/dto/create-order.dto.ts, apps/web/components/CheckoutForm.tsx
- 2026-07-07: Create a visually appealing online store using Next.js, NestJS, and Tailwind CSS. This should not be a full enterprise e-commerce platform,  — apps/api/src/interfaces/index.ts, apps/api/src/main.ts, apps/api/src/mock-data/categories.ts, apps/api/src/mock-data/products.ts, apps/api/src/modules/cart/cart.controller.ts, apps/api/src/modules/cart/cart.module.ts, apps/api/src/modules/cart/cart.service.ts, apps/api/src/modules/cart/dto/add-to-cart.dto.ts

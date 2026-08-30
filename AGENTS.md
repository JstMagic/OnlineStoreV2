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

- 2026-08-30: The deploy build for this app FAILED. Fix the code so it builds cleanly inside a container (no network and no running backend/database at bu — apps/web/app/order-history/page.tsx
- 2026-08-30: Implement Order History Recent conversation with the customer (context for what the instruction refers to; the instruction itself is above): — apps/web/lib/api.ts, AGENTS.md, README.md, apps/api/src/modules/orders/dto/query-orders.dto.ts, apps/api/src/modules/orders/orders.controller.ts, apps/api/src/modules/orders/orders.service.ts, apps/web/README.md, apps/web/app/order-history/page.tsx
- 2026-08-27: okay go ahead and merge them Recent conversation with the customer (context for what the instruction refers to; the instruction itself is ab — AGENTS.md
- 2026-08-27: please merge them Recent conversation with the customer (context for what the instruction refers to; the instruction itself is above): User: — AGENTS.md
- 2026-09-01: Merged pull requests into the main branch. Reviewed code quality, tested locally, resolved conflicts, and updated the main branch. Ensured all changes adhere to project conventions and security requirements.
- 2026-09-03: Implemented Order History feature and added passkey authentication integration.

- 2026-08-26: Also lets add a policy page and faq pase Recent conversation with the customer (context for what the instruction refers to; the instruction  — AGENTS.md, apps/web/app/faq/page.tsx, apps/web/app/policy/page.tsx, apps/web/components/Header.tsx
- 2026-08-30: Added a policy page and FAQ page to the web application. Updated the header to include links to these pages.
- 2026-08-22: when i click on shop its stuck on spinning wheel Recent conversation with the customer (context for what the instruction refers to; the inst — apps/web/app/api/[...path]/route.ts, apps/web/app/products/ProductList.tsx, apps/web/next.config.js, package-lock.json
- 2026-07-14: The live preview and some deployed routes still have CSP problems. Two fixes in apps/web, mirroring how a fresh scaffold now does it: 1. app — apps/web/app/layout.tsx, apps/web/middleware.ts
- 2026-07-14: The deployed site renders blank in the browser. The console shows the cause: six "Executing inline script violates ... script-src 'self'" CS — apps/web/middleware.ts, apps/web/next.config.js
- 2026-07-14: In scripts/start.js, the API child is spawned with env: { ...process.env, PORT: API_PORT }, but apps/api/src/main.ts reads process.env.API_P — scripts/start.js
- 2026-07-14: okay apply the fix Recent conversation with the customer (context for what the instruction refers to; the instruction itself is above): Agen — apps/api/src/main.ts, apps/web/package.json
- 2026-07-13: apply the fix Recent conversation with the customer (context for what the instruction refers to; the instruction itself is above): User: the — apps/web/next.config.js
- 2026-07-13: the website flickers, some times it renders the page and sometimes it doesnt and shows a blank page Recent conversation with the customer (c — apps/web/app/layout.tsx, apps/web/components/ClientErrorBoundary.tsx, apps/web/context/CartContext.tsx
- 2026-07-13: Make this change and open the deploy: In the Dockerfile, the runner stage copies the build in as root and then switches to USER app. That us — Dockerfile
- 2026-07-13: lets add a support and faq page Recent conversation with the customer (context for what the instruction refers to; the instruction itself is — apps/web/app/support/page.tsx, apps/web/components/Header.tsx
- 2026-07-12: The app BUILT successfully but the deployed container never becomes HEALTHY (it crashes at startup, or it runs but fails the load-balancer h — apps/web/app/page.tsx
- 2026-07-12: The app BUILT successfully but the deployed container never becomes HEALTHY (it crashes at startup, or it runs but fails the load-balancer h — apps/web/lib/api.ts
- 2026-07-12: The app BUILT successfully but the deployed container never becomes HEALTHY (it crashes at startup, or it runs but fails the load-balancer h — apps/web/lib/api.ts
- 2026-07-12: The app BUILT successfully but the deployed container never becomes HEALTHY (it crashes at startup, or it runs but fails the load-balancer h — scripts/start.js
- 2026-07-12: The app BUILT successfully but the deployed container never becomes HEALTHY (it crashes at startup, or it runs but fails the load-balancer h — apps/web/next.config.js
- 2026-07-12: The app BUILT successfully but the deployed container never becomes HEALTHY (it crashes at startup, or it runs but fails the load-balancer h — apps/api/src/config/env.validation.ts
- 2026-07-12: The app BUILT successfully but the deployed container never becomes HEALTHY (it crashes at startup, or it runs but fails the load-balancer h — apps/api/src/main.ts, scripts/start.js
- 2026-07-11: The deployed container crash-loops. The logs show: Error: Cannot find module '/app/apps/web/server.js' (MODULE_NOT_FOUND), exit code 1. Two  — Dockerfile, scripts/start.js
- 2026-07-10: The deploy build for this app FAILED. Fix the code so it builds cleanly inside a container (no network and no running backend/database at bu — apps/web/app/order-confirmation/OrderConfirmationClient.tsx, apps/web/app/order-confirmation/page.tsx, apps/web/app/page.tsx, apps/web/next-env.d.ts
- 2026-07-10: try to fix the deployment issue — apps/web/next.config.js
- 2026-07-10: fix it — apps/api/src/app.module.ts, apps/api/src/modules/orders/dto/create-order.dto.ts, apps/web/components/CheckoutForm.tsx
- 2026-07-07: Create a visually appealing online store using Next.js, NestJS, and Tailwind CSS. This should not be a full enterprise e-commerce platform,  — apps/api/src/interfaces/index.ts, apps/api/src/main.ts, apps/api/src/mock-data/categories.ts, apps/api/src/mock-data/products.ts, apps/api/src/modules/cart/cart.controller.ts, apps/api/src/modules/cart/cart.module.ts, apps/api/src/modules/cart/cart.service.ts, apps/api/src/modules/cart/dto/add-to-cart.dto.ts

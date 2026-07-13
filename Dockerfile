# One container, two processes (API + Next), non-root. Next 'standalone' output keeps it small.
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY apps/api/package*.json apps/api/
COPY apps/web/package*.json apps/web/
RUN npm install --no-audit --no-fund --include=dev
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -S app && adduser -S app -G app
# API: compiled output.
COPY --from=build /app/apps/api/dist ./apps/api/dist
# Web: Next standalone bundle (copied to root so server.js → ./apps/web/server.js).
COPY --from=build /app/apps/web/.next/standalone ./
# API: production node_modules (overwrites standalone’s node_modules with the full monorepo set).
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=build /app/apps/web/public ./apps/web/public
COPY scripts/start.js ./scripts/start.js
RUN mkdir -p apps/web/.next/cache && chown -R app:app apps/web/.next
USER app
EXPOSE 3000
CMD ["node", "scripts/start.js"]

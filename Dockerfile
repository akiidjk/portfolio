FROM oven/bun:1.3.14-alpine AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM oven/bun:1.3.14-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

FROM oven/bun:1.3.14-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/dist ./
COPY --from=build /app/public ./public
COPY --from=build /app/src/assets ./src/assets

RUN addgroup -S app && adduser -S app -G app
USER app

ARG PORT=3000
ENV PORT=${PORT}
EXPOSE ${PORT}

CMD ["bun", "index.js"]

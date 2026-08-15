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

# Bun is already in the image, so use it for the probe instead of pulling
# in curl/wget just for this. Hits the real home page, not a stub route.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD bun -e "fetch('http://localhost:'+process.env.PORT+'/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["bun", "index.js"]

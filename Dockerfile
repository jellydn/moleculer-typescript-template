FROM node:22.23.4-alpine

WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
# The source entry point uses tsx and generates DTO docs at runtime.
RUN pnpm install --frozen-lockfile --prod --store-dir /tmp/pnpm-store \
    && rm -rf /tmp/pnpm-store

COPY server.ts moleculer.config.ts logger.ts tsconfig.json ./
COPY services services
COPY public public

ENV NODE_ENV=production
ENV PORT=8888
ENV TRANSPORTER=TCP
EXPOSE 8888

CMD ["./node_modules/.bin/tsx", "server.ts"]

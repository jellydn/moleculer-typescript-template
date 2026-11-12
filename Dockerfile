FROM node:26.13.1-alpine

WORKDIR /app
RUN npm install -g pnpm@10.34.9

COPY package.json pnpm-lock.yaml ./
# The source entry point uses tsx and generates DTO docs at runtime.
RUN pnpm install --frozen-lockfile --prod --store-dir /tmp/pnpm-store \
    && rm -rf /tmp/pnpm-store

COPY --chown=node:node server.ts moleculer.config.ts logger.ts tsconfig.json ./
COPY --chown=node:node services services
COPY --chown=node:node public public

ENV NODE_ENV=production
ENV PORT=8888
ENV TRANSPORTER=TCP
EXPOSE 8888

USER node
CMD ["./node_modules/.bin/tsx", "server.ts"]

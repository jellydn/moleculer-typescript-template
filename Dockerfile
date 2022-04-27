FROM mhart/alpine-node:16 as builder
# Build the image
RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock logger.ts moleculer.config.ts tsconfig.json ./
COPY services services
COPY addons addons
COPY public public

RUN yarn install
ENV NODE_ENV=production
RUN yarn build

# Copy the build output
FROM mhart/alpine-node:16
WORKDIR /app
COPY --from=builder /app .

CMD ["yarn", "start"]

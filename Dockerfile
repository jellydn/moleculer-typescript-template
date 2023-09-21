# Use Node.js 20 alpine image as builder
FROM node:20-alpine as builder

# Set up working directory
RUN mkdir /app
WORKDIR /app

# Install git and other dependencies
RUN apk --no-cache add git

# Copy essential files
COPY package.json pnpm-lock.yaml logger.ts moleculer.config.ts tsconfig.json ./
COPY services services
COPY addons addons
COPY public public

# Install pnpm and dependencies, then build
RUN npm install -g pnpm
RUN pnpm install
ENV NODE_ENV=production
RUN pnpm run build

# Set up the production image
FROM node:20-alpine
WORKDIR /app

# Copy build output from builder
COPY --from=builder /app .

# Expose port for application
EXPOSE 8080

# Start the application
CMD ["npm", "run", "start"]

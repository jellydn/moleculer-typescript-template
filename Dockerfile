# Use Node.js 20 alpine image as builder
FROM node:22.17.0-alpine as builder

# Set up working directory
RUN mkdir /app
WORKDIR /app

# Install git and other dependencies
RUN apk --no-cache add git

# Copy essential files
COPY package.json pnpm-lock.yaml *.ts ./
COPY services services
COPY public public

# Install pnpm and dependencies
RUN npm install -g pnpm
ENV COREPACK_ENABLE_STRICT=0
RUN pnpm install
ENV NODE_ENV=production

# Set up the production image
FROM node:22.17.0-alpine
WORKDIR /app

# Copy build output from builder
COPY --from=builder /app .

# Expose port for application
EXPOSE 8080

# Start the application
CMD ["npm", "run", "start"]

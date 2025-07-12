# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Start Development Server:**
```bash
pnpm dev
```
Runs the API server with hot-reload, loads all services, and pipes output through pino-pretty for readable logs.

**Testing:**
```bash
pnpm test           # Run tests once
pnpm test:ci        # Run tests in watch mode
pnpm test:coverage  # Run with coverage report
pnpm test:ui        # Open Vitest UI
```

**Code Quality:**
```bash
pnpm lint           # Lint with Biome
pnpm check          # Format and fix with Biome
pnpm format         # Format code with Biome
pnpm typecheck      # TypeScript type checking (also generates SDK)
```

**Build:**
```bash
pnpm build          # Production build with tsup
```

**Service Generation:**
```bash
pnpm generate:service [name]     # Generate new service
pnpm generate:crud [name]        # Generate CRUD service
pnpm generate:action [name]      # Generate new action
```

**API Documentation:**
```bash
pnpm generate:swagger   # Generate OpenAPI/Swagger docs
pnpm generate:sdk       # Generate TypeScript SDK from OpenAPI spec
```

## Architecture Overview

This is a **Moleculer microservices framework** project written in TypeScript. The architecture follows these patterns:

### Core Structure
- **Services**: Located in `services/` directory, auto-loaded by the broker
- **API Gateway**: `api.service.ts` handles HTTP routing via moleculer-web
- **Configuration**: `moleculer.config.ts` defines broker settings, `server.ts` bootstraps the application
- **DTOs**: Zod schemas in `services/dtos/` for validation and OpenAPI generation

### Key Technologies
- **Moleculer**: Microservices framework with NATS transporter
- **Zod**: Schema validation with `moleculer-zod-validator`
- **OpenAPI**: Auto-generated from JSDoc comments and Zod schemas
- **Biome**: Linting, formatting (4-space indentation, 100 char line width)
- **Vitest**: Testing framework
- **Pino**: Structured JSON logging

### Service Pattern
Services follow this structure:
1. **TypeScript interfaces** for settings, methods, and service context
2. **Actions** with REST endpoints, Zod validation, and Swagger documentation
3. **Lifecycle hooks** (created, started, stopped)
4. **Parameter validation** using Zod schemas before action execution

### API Gateway
- Serves on port 3000 (configurable via `PORT` env var)
- Routes: `/api/health` (health check), `/api/*` (service actions)
- Static files served from `public/` directory
- Auto-aliases enabled for service actions

### Testing
- Unit tests in `test/unit/services/`
- E2E tests using Hurl files in `test/e2e/`
- Test pattern: `*.spec.ts` files

### Development Tools
- **Hygen templates**: Code generation in `_templates/`
- **Docker Compose**: Available for containerized development
- **CLI**: `pnpm cli` for REPL access to services
- **Hot reload**: Via tsx with watch mode
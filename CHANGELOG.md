# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Changed

- Updated all project dependencies to latest versions
- Migrated @biomejs/biome from v1.9 to v2.1 with new configuration schema
- Updated @hey-api/openapi-ts from v0.66.6 to v0.78.3 and removed deprecated @hey-api/client-fetch
- Updated Vite from v6 to v7 with Node.js 22+ requirement
- Updated @types/node from v22.9.4 to v22.16.3 for Vite v7 peer dependency compatibility
- Removed @types/jest dependency and c8 coverage tool (project uses Vitest exclusively)
- Updated Vitest from v3.1.2 to v3.2.4 with @vitest/coverage-v8 for built-in coverage
- Migrated from global test APIs to explicit Vitest imports for better clarity
- Enhanced Vitest configuration with proper coverage settings and exclusions
- Updated dotenv from v16 to v17
- Updated npm-run-all2 from v7 to v8
- Updated minor/patch versions: @asteasolutions/zod-to-openapi (7.3.0→7.3.4), @types/express (5.0.1→5.0.3), @types/lodash (4.17.16→4.17.20), graphql-ws (6.0.4→6.0.5), pino (9.6.0→9.7.0), sort-package-json (3.0.0→3.4.0), tsup (8.4.0→8.5.0), tsx (4.19.3→4.20.3), ws (8.18.1→8.18.3), yaml (2.7.1→2.8.0)

### Added

- Comprehensive SDK generation tests to ensure OpenAPI SDK functionality
- Cross-environment package manager detection for test compatibility

### Fixed

- OpenAPI SDK generation error "client needs to be set to generate SDKs"
- CI/CD compatibility issues with Node.js version requirements
- Biome v2 configuration migration and linting setup
- Cross-platform test execution (pnpm vs bun environments)

### Infrastructure

- Updated minimum Node.js requirement to 22.0.0 for modern tooling compatibility
- Improved dependency management with peer dependency resolution
- Enhanced test coverage for SDK generation workflow

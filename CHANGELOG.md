# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Changed
- Updated all project dependencies to latest versions
- Migrated @biomejs/biome from v1.9 to v2.1 with new configuration schema
- Updated @hey-api/openapi-ts from v0.66.6 to v0.78.3 and removed deprecated @hey-api/client-fetch
- Updated Vite from v6 to v7 with Node.js 22+ requirement
- Updated @types/node from v22.9.4 to v22.16.3 for Vite v7 peer dependency compatibility
- Updated @types/jest from v29 to v30
- Updated dotenv from v16 to v17
- Updated npm-run-all2 from v7 to v8

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
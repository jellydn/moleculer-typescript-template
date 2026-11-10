---
id: TASK-8
title: Finish weather API and Playwright mock coverage
status: Done
assignee: []
created_date: "2026-11-10 13:24"
updated_date: "2026-11-10 16:06"
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

Make the existing draft weather demo deterministic and portable without importing tests in production.

<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

- [x] #1 Weather API succeeds with mock data and rejects invalid requests
- [x] #2 Unit and Playwright API tests run without external weather network access
- [x] #3 Production startup has no test imports and CI runs matching port environment and Node version

<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->

1. Merge main and preserve current tool configuration. 2. Move mock startup to test-owned bootstrap. 3. Fix portable assertions and API-only Playwright configuration. 4. Run typecheck unit HTTP and Playwright suites then review current-head CI.

<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->

Test-owned MSW bootstrap keeps mocks out of production. Coordinates are validated before coercion; blanks, missing values, non-numeric text and out-of-range values return 422. Numeric strings use JavaScript Number syntax, including hexadecimal and scientific notation, with bounds applied after conversion. Upstream HTTP failures retain data.status; other 502 failures identify network, timeout, invalid_json or invalid_payload in data.reason without exposing internal details. WeatherData is inferred from the runtime Zod schema, and valid extra fields survive at all response levels. The README explains live grid-cell coordinates versus the mock's deliberate query echo. Complete OpenAPI metadata covers the same fields and generates the SDK. Removed per-request debug output and restricted the Playwright workflow token. The Playwright readiness probe uses list-aliases instead of the feature under test. Verified frozen install, typecheck, unit and API suites, lint, Biome, build and actionlint. Invalid-payload regressions fail before the schema fix and pass after it; HTTP tests cover error reasons and numeric-string conversion, and a unit regression distinguishes timeout from network failure.

Modified files: services/weather.service.ts; test/unit/services/weather.spec.ts; tests/weather.spec.ts; tests/mocks/fixtures.ts, handlers.ts and server.ts; tests/start-server.ts; playwright.config.ts; .github/workflows/playwright.yml; README.md; public/docs/open-api.json. Trade-offs: Number syntax accepts hexadecimal and scientific notation for compatibility, while explicit range checks still reject invalid coordinates. The deterministic MSW handler echoes query coordinates to test forwarding; live Open-Meteo responses use grid-cell coordinates instead.
<!-- SECTION:NOTES:END -->

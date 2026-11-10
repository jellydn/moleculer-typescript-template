---
id: TASK-8
title: Finish weather API and Playwright mock coverage
status: In Progress
assignee: []
created_date: "2026-11-10 13:24"
updated_date: "2026-11-10 15:10"
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

Make the existing draft weather demo deterministic and portable without importing tests in production.

<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

-   [x] #1 Weather API succeeds with mock data and rejects invalid requests
-   [x] #2 Unit and Playwright API tests run without external weather network access
-   [x] #3 Production startup has no test imports and CI runs matching port environment and Node version
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->

1. Merge main and preserve current tool configuration. 2. Move mock startup to test-owned bootstrap. 3. Fix portable assertions and API-only Playwright configuration. 4. Run typecheck unit HTTP and Playwright suites then review current-head CI.
 <!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->

Test-owned MSW bootstrap keeps mocks out of production. Coordinates are validated before coercion; blanks, missing values, text and out-of-range values return 422. Upstream HTTP failures retain data.status, while transport, timeout, invalid JSON and invalid response shapes return 502. WeatherData is inferred from the runtime Zod schema, and valid extra fields survive at all response levels. The shared fixture records the live grid-cell response; query-sensitive handlers deliberately echo requested coordinates to detect forwarding errors. Complete OpenAPI metadata covers the same fields and generates the SDK. Removed per-request debug output and restricted the Playwright workflow token. Verified frozen install, typecheck, 19 unit tests, 26 Playwright API tests, lint, Biome, build and actionlint. Two invalid-payload regression cases fail before the schema fix and pass after it. Current-head GitHub review remains pending; task stays In Progress until gates pass.

<!-- SECTION:NOTES:END -->

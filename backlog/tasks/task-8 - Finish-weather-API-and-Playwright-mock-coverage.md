---
id: TASK-8
title: Finish weather API and Playwright mock coverage
status: In Progress
assignee: []
created_date: "2026-11-10 13:24"
updated_date: "2026-11-10 13:50"
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

Removed production imports of test mocks and duplicate Vitest config. Test-owned bootstrap starts MSW before services. Playwright runs API requests once without browser installs, waits for weather alias at port 18889, and sets test environment/TCP transport. Unit mocks explicitly listen/reset/close; exact payload and upstream failure tested. Health assertions use runtime OS values. Pinned Playwright 1.65.0 and MSW 2.15.0; MSW 3 requires a broader TypeScript module-resolution migration, so retained compatible major 2. Local typecheck, 14 unit tests, lint, Biome, build and 10 Playwright API tests pass. GitHub validation pending.

Addressed Pullfrog findings: numeric coordinate bounds with query coercion, explicit 502 upstream failure with preserved status, Biome coverage for tests/, and README notes for public Open-Meteo dependency and test-tree roles. Local frozen install, typecheck, 15 unit tests, lint, Biome, build and 20 Playwright API tests pass. HTTP cases cover both coordinate boundaries, values just outside them, invalid text, and an empty-statusText upstream failure.
<!-- SECTION:NOTES:END -->

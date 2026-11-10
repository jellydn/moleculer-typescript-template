---
id: TASK-9
title: Replace Fly deployment with Dokku production release
status: In Progress
assignee: []
created_date: '2026-11-10 13:31'
updated_date: '2026-11-10 14:13'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Deploy the verified application to the existing moleculer Dokku app instead of the incorrect Fly target.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 CI validates the Docker image and deploys only main to the existing Dokku app over verified SSH
- [ ] #2 Container starts in production on port 8888 and passes startup health checks
- [ ] #3 Live deployment serves health and API requests with the merged revision
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Preserve existing app domain and two-process routing. 2. Replace Fly publishing with pinned-host Dokku Git deployment and validated Docker build. 3. Build locally, review CI and merge without overrides. 4. Deploy exact merged revision and verify each process plus public health and cart validation.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
GitHub deployment remains manual-dispatch-only until the owner approves an app-scoped SSH key and repository secret. Manual deployment from the Mac uses existing access. Replaced Fly target with the existing Dokku app and port, production runtime environment, bounded startup checks, and PR Docker validation. Also addressed migration review feedback: verified all 0.15 documentation pages and anchors and used z.strictObject. Local typecheck, 15 unit tests, 10 Playwright tests, lint, Biome, and build pass. Actual single-stage image built locally (1.04 GB); runtime validation and disk safety review continue.

Review follow-up: installed only production dependencies; declared the lodash package actually imported at runtime and moved tsx and zod-to-openapi to runtime dependencies. Image is now 336,309,367 bytes; production container serves health with the expected X-Revision, greeter and all 10 Hurl requests. Added CI container smoke checks, revision-specific release verification, deploy-branch preflight and removed workflow-wide cancellation races. Live read-only preflight confirms TCP and http:80:8888 https:443:8888; preserve configuration. Weather follow-up rejects blanks before numeric coercion, maps network/JSON/timeout failures to 502, checks forwarded queries and documents the endpoint in generated OpenAPI. Frozen install, typecheck, 15 unit tests, 26 Playwright tests, lint, Biome and build pass locally. Host is 96% full; no cleanup or deployment performed. Six exact private cache records (about 1.685 GB) proposed for separate owner approval; root preview subsequently denied authentication. Production release remains blocked on capacity and exact-head review gates.
<!-- SECTION:NOTES:END -->

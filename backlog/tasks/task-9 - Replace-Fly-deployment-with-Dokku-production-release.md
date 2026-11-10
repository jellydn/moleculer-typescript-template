---
id: TASK-9
title: Replace Fly deployment with Dokku production release
status: In Progress
assignee: []
created_date: "2026-11-10 13:31"
updated_date: "2026-11-10 14:13"
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

Replaced Fly with the existing Dokku app, pinned SSH host key, production-only dependencies, TCP, port 8888, startup checks and revision-specific health verification. GitHub deployment remains manual-dispatch-only and needs separate approval for a new key and repository secret; manual Mac deployment uses existing access. No credential was provisioned. Migration follow-up fixes the 0.15 documentation links and z.strictObject usage.

Read-only inspection confirms Dokku 0.37.7, per-app deploy-branch=main, global deploy-branch=master, TCP and http:80:8888 https:443:8888. The workflow requires the verified per-app main setting and fails on drift; it does not claim support for inherited branch settings on this old host. Explicit bash propagates rejected push status through tee. Seven isolated executions of the actual workflow cover main, master, empty and wrong branches, SSH failure, rejected push and skipped deployment.

Owner-approved exact-ID cache cleanup completed after a fresh reference and in-use audit: 107 records became 101; all other cache IDs, 16 image IDs, 24 container IDs and 23 volume names were unchanged. Available space rose from 3,701,366,784 to 5,386,567,680 bytes: 1,685,200,896 bytes actually freed. No further cleanup is authorized. Recheck capacity immediately before deployment and preserve all images and rollback data.

The latest integrated Node 22 amd64 image built successfully after frozen install, typecheck, 19 unit tests, 26 API tests, lint, Biome, build and actionlint. Earlier measured Node 22 runtime passed revision-header and 10-request Hurl checks without test tools installed. Node 26 is validated separately in PR #895. Weather responses now validate the complete upstream shape while preserving valid extra fields, and OpenAPI describes the full payload. Production remains on its old release; task stays In Progress until exact-head review gates and live deployment verification complete.
<!-- SECTION:NOTES:END -->

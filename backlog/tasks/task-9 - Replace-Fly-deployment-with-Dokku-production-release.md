---
id: TASK-9
title: Replace Fly deployment with Dokku production release
status: In Progress
assignee: []
created_date: "2026-11-10 13:31"
updated_date: "2026-11-10 13:31"
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

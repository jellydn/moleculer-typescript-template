---
id: TASK-4
title: Keep grouped dependency updates compatible with Moleculer 0.14
status: In Progress
assignee: []
created_date: "2026-11-10T07:50:00Z"
updated_date: "2026-11-10T07:52:00Z"
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

PR #883 must preserve the current framework contract while updating compatible dependencies.

<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

-   [x] #1 TypeScript compilation and existing tests pass with the grouped dependency updates
-   [x] #2 Framework and companion packages retain compatible peer versions
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->

1. Confirm the failing upgrade. 2. Keep the framework and companion dependencies on compatible versions. 3. Regenerate the lockfile and run tests, typecheck, lint, and build.
 <!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->

Kept moleculer 0.14.35, moleculer-web 0.10.8, and moleculer-connect 0.2.2 because the grouped upgrades introduced an unplanned 0.15 framework migration and seven TypeScript errors. Regenerated pnpm-lock.yaml. Existing tests now pass (3 files, 11 tests); typecheck, lint, and production build pass. Kept existing regression coverage, including SDK compilation. CI remains blocked by the missing Claude GitHub App and the unrelated Hurl/libxml2 runner failure, so this task remains In Progress. Existing Pino/repl peer warnings are unchanged from main.

<!-- SECTION:NOTES:END -->

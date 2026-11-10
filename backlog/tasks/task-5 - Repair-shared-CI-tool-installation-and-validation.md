---
id: TASK-5
title: Repair shared CI tool installation and validation
status: In Progress
assignee: []
created_date: "2026-11-10T08:05:00Z"
updated_date: "2026-11-10T08:07:00Z"
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

Ensure E2E checks install their dependencies and pre-commit failures are visible without CI writing to PR branches.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

- [ ] #1 Hurl 4.0.0 installs with its dependencies and executes existing E2E assertions
- [x] #2 Pre-commit runs Biome 2 successfully against the repository configuration
- [x] #3 Invalid source formatting makes CI fail without automatic commits or ignored errors

<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->

1. Reproduce the current Hurl and Biome failures. 2. Install Hurl with dependency resolution and use the Biome CI hook matching package.json. 3. Make pre-commit read-only and fail on validation errors. 4. Run positive and negative validation plus existing checks and inspect remote CI.

<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->

Changed Hurl installation from dpkg -i to apt-get install of the local deb after refreshing package indexes, so dependencies are resolved before server startup. Switched the existing hook to non-writing biome-ci with Biome 2.4.6, matching package.json. Pre-commit CI now has contents:read, propagates failures, and no longer auto-commits. Updated README. Baseline Biome 1 failed on assist/includes; both hooks now pass. Negative validation: malformed TypeScript exits 1 without file mutation; formatted control exits 0. Local typecheck, 11 tests, lint, Biome CI, build, and workflow contract checks pass. Hurl verification on the Ubuntu GitHub runner is pending; task remains In Progress until remote validation completes.
<!-- SECTION:NOTES:END -->

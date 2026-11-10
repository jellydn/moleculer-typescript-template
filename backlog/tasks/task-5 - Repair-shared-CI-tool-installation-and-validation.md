---
id: TASK-5
title: Repair shared CI tool installation and validation
status: In Progress
assignee: []
created_date: "2026-11-10T08:05:00Z"
updated_date: "2026-11-10T08:16:00Z"
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

Ensure E2E checks install their dependencies and pre-commit failures are visible without CI writing to PR branches.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

- [x] #1 Hurl 4.0.0 installs with its dependencies and executes existing E2E assertions
- [x] #2 Pre-commit runs Biome 2 successfully against the repository configuration
- [x] #3 Invalid source formatting makes CI fail without automatic commits or ignored errors

<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->

1. Reproduce the current Hurl and Biome failures. 2. Install Hurl with dependency resolution and use the Biome CI hook matching package.json. 3. Make pre-commit read-only and fail on validation errors. 4. Run positive and negative validation plus existing checks and inspect remote CI.

<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->

Changed Hurl installation from dpkg -i to apt-get install of the local deb after refreshing package indexes, so dependencies are resolved before server startup. Switched the existing hook to non-writing biome-ci with Biome 2.4.6, matching package.json. Pre-commit CI now has contents:read, propagates failures, and no longer auto-commits. Updated README. Baseline Biome 1 failed on assist/includes; both hooks now pass. Negative validation: malformed TypeScript exits 1 without file mutation; formatted control exits 0. Local typecheck, 11 tests, lint, Biome CI, build, and workflow contract checks pass. Remote pre-commit passed. The first remote APT install showed ubuntu-latest now uses Ubuntu 26.04, where libxml2 is unavailable. Pinned only E2E to Ubuntu 24.04, which provides that dependency, rather than upgrading Hurl or forcing incompatible packages. Hurl then installed and executed all three files, exposing a readiness race: health returned 200 before generated product aliases existed; the cart assertion received 404, and the alias appeared 320 ms later. CI now waits for the generated list-aliases endpoint as well as health, with a 60-second limit, before running unchanged assertions. Final remote E2E validation is pending; task remains In Progress.

Remote validation on commit 76b0d82: Hurl 4 installs successfully on Ubuntu 24.04; Test run 42781112054 executes 3 Hurl files and 10 requests, all passing. Pre-commit run 42781111990 passes both Prettier and Biome CI. Only Claude review is blocked: its run explicitly reports that the Claude GitHub App is not installed. Task stays In Progress because the overall CI gate and merge remain blocked on the owner.
<!-- SECTION:NOTES:END -->

---
id: TASK-7
title: Complete coordinated Moleculer and Zod migration
status: In Progress
assignee: []
created_date: "2026-11-10 13:17"
updated_date: "2026-11-10 13:23"
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

Complete the owner-approved framework, validator and schema migration across remaining dependency PRs.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

- [x] #1 Moleculer 0.15 and Zod 4 use compatible gateway validator and generator versions
- [x] #2 Typecheck unit tests API integration lint and production build pass
- [ ] #3 Remaining dependency PRs integrate without regressing runtime validation

<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->

1. Merge current main into PR 657 without rewriting history. 2. Upgrade framework gateway validator Zod and generator together. 3. Adapt removed framework types and run static runtime and API checks. 4. Review and merge through passing GitHub checks, then integrate remaining dependency heads.

<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->

Owner approved the previously deferred migration. Upgraded stable broker, gateway, validator, Zod and generator together and aligned CLI/repl/socket peers. Adapted framework types and options. Registered JSDoc-only cart components explicitly; regression test verifies required fields. HTTP validation uses Zod issue code and keys, not version-specific English. Local typecheck, 12 tests, lint, Biome, production build and Hurl (3 files, 10 requests) pass. GitHub CI and remaining PR integration are pending.
<!-- SECTION:NOTES:END -->

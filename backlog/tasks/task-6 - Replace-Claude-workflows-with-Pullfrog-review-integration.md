---
id: TASK-6
title: Replace Claude workflows with Pullfrog review integration
status: In Progress
assignee: []
created_date: "2026-11-10T08:25:00Z"
updated_date: "2026-11-10T08:26:00Z"
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

Use the supported Pullfrog integration for repository reviews without changing unrelated review tools or bypassing review gates.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

- [x] #1 Claude-specific workflows are replaced by the official Pullfrog dispatch workflow
- [x] #2 Owner setup, model costs, bot review settings, and verification limits are documented
- [x] #3 Workflow structure and repository validation pass; runtime integration is confirmed or explicitly blocked

<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->

1. Verify official setup, model costs, and review checks. 2. Replace both Claude workflows with the official Pullfrog dispatch workflow and document owner setup. 3. Validate YAML, hooks, and unchanged reviewer files. 4. Push and inspect CI, keeping runtime verification and merges blocked until owner authorization.

<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->

Replaced both Claude-specific workflows with the current official Pullfrog workflow_dispatch template, including OIDC authentication, read-only contents, checkout without persisted credentials, and pullfrog/pullfrog@v0. Other reviewer configuration is unchanged. Official billing docs confirm public platform use is free but tokens are separate; the funded OSS program requires more than 1,000 stars, while this repository has 17. README documents App authorization, model access, bot PR reviews, run/verdict checks, and owner migration of any required Claude gate without bypass. YAML contract assertions and repository hooks pass; no paid access or secrets were changed. GitHub returns 404 for the Pullfrog workflow because it is not yet on the default branch. Runtime integration remains unverified and task stays In Progress pending owner installation, model configuration, default-branch verification, and an actual PR review. Existing branch-protection settings could not be read (403), so no gate change or merge is attempted.
<!-- SECTION:NOTES:END -->

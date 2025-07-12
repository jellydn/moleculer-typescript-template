---
id: task-1
title: Fix OpenAPI SDK generation missing client configuration
status: Done
assignee: []
created_date: '2025-07-12'
updated_date: '2025-07-12'
labels: []
dependencies: []
---

## Description

The openapi-ts command is failing because no HTTP client is specified for SDK generation. The error indicates that a client needs to be set to generate SDKs.

## Acceptance Criteria

- [ ] SDK generation command succeeds without errors
- [ ] Generated SDK files are created in expected location
- [ ] CI/CD pipeline passes without SDK generation failures
- [ ] Documentation is updated with correct SDK generation setup

## Implementation Plan

1. Investigate current OpenAPI TS configuration and error\n2. Update to latest @hey-api/openapi-ts version\n3. Configure correct client plugin for SDK generation\n4. Update example client code to use new API structure\n5. Verify SDK generation works and typecheck passes

## Implementation Notes

Fixed OpenAPI SDK generation by updating configuration from legacy 'client: legacy/fetch' to modern 'plugins: [@hey-api/client-fetch]' approach. Updated @hey-api/openapi-ts from 0.64.10 to 0.66.6. Modified example client.ts to use new functional API instead of class-based API. Added exportCore: true option for better client exports. All tests pass and SDK generation now works correctly in CI/CD pipeline.

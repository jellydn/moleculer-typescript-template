# Welcome to moleculer-typescript-template 👋

![Version](https://img.shields.io/badge/version-0.1.1-blue.svg?cacheSeconds=2592000)
![Prerequisite](https://img.shields.io/badge/node-%3E%3D%2026.0.0-blue.svg)
[![Twitter: jellydn](https://img.shields.io/twitter/follow/jellydn.svg?style=social)](https://twitter.com/jellydn)

> My Moleculer-based microservices project

[![Moleculer - Progressive microservices framework for Node.js ](https://img.youtube.com/vi/peb2OflRu-4/0.jpg)](https://www.youtube.com/watch?v=peb2OflRu-4)

[![IT Man - Automating API Client Generation with openapi-ts](https://i.ytimg.com/vi/LwfcoOWlyOw/hqdefault.jpg)](https://www.youtube.com/watch?v=LwfcoOWlyOw)

[![IT Man - Logdy Deep Dive: Streamlining Log Management with a Powerful Web UI](https://i.ytimg.com/vi/wO5MTD3Lawg/hqdefault.jpg)](https://www.youtube.com/watch?v=wO5MTD3Lawg)

[![ITMan - Automate API Linting: Spectral Integration with VS Code and GitHub Actions](https://i.ytimg.com/vi/sTjIgGBhfMs/hqdefault.jpg)](https://www.youtube.com/watch?v=sTjIgGBhfMs)

<!-- [![Deploy](https://button.deta.dev/1/svg)](https://go.deta.dev/deploy?repo=https://github.com/jellydn/moleculer-typescript-template) -->

## Prerequisites

- Node.js >= 26.0.0

## Init new project

```sh
npx degit jellydn/moleculer-typescript-template [PROJECT-NAME]
```

## Features

- ⚡️ Progressive microservices framework for Node.js.
  [Moleculer](https://moleculer.services/) with [Typescript](https://www.typescriptlang.org/) template
- 📦 [hygen](http://www.hygen.io/) - The scalable code generator that saves you time.
- 🦾 [pino](https://getpino.io) - super fast, all natural json logger
- 🔥 [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc/blob/v6/docs/README.md) - Generates swagger/openapi specification based on jsDoc comments and YAML files.
- ✨ [moleculer-zod-validator](https://github.com/TheAppleFreak/moleculer-zod-validator) - A validator for the Moleculer microservice framework to allow the use of [Zod](https://zod.dev/).
- 🔏 [asteasolutions/zod-to-openapi](https://github.com/asteasolutions/zod-to-openapi#defining-schemas) - A library that generates OpenAPI (Swagger) docs from Zod schemas.
- 🪄 [hey-api/openapi-ts](https://github.com/hey-api/openapi-ts) - Turn your OpenAPI specification into a beautiful TypeScript client.

## Install

```sh
pnpm install
```

## Weather API and tests

The template exposes `GET /api/weather?latitude=52.52&longitude=13.41` in every deployment.
It calls the external Open-Meteo forecast API. Latitude must be between -90 and 90 and longitude between -180 and 180.
Non-blank numeric strings use JavaScript Number syntax, including scientific and hexadecimal notation; bounds apply after conversion. Non-numeric text returns 422.
Open-Meteo returns the coordinates of its grid cell, not necessarily the requested coordinates. Test mocks deliberately echo the query to detect forwarding errors.
Missing current measurements remain `null`, as returned by Open-Meteo; malformed values still return 502.
Upstream HTTP failures return 502 with the upstream status in `data.status`.
Network failures, the five-second timeout, malformed JSON and invalid response payloads return 502 with `WEATHER_UPSTREAM_ERROR` and `data.reason` set to `network`, `timeout`, `invalid_json` or `invalid_payload`, respectively. Internal error details are not exposed.
Remove `services/weather.service.ts` from a derived project if it does not need this public demo endpoint.

`pnpm test` runs Vitest tests in `test/`. `pnpm test:e2e` runs the API-only Playwright suite in `tests/`.
The Playwright suite starts its own broker and MSW mocks through `tests/start-server.ts`; production startup never loads these mocks.
Both test trees are checked by Biome. No browser installation is needed for the API suite.

## Usage

```sh
# Copy env file
cp .env.example .env
pnpm dev
```

After starting, open the http://localhost:3000/ URL in your browser.
On the welcome page you can test the generated services via API Gateway and check the nodes & services.
![https://gyazo.com/c8a8c8b05319504d36922458d9807db2.gif](https://gyazo.com/c8a8c8b05319504d36922458d9807db2.gif)

```sh
pnpm cli --ns api
```

![https://gyazo.com/235f710ab3fd906f80768261e793eb13](https://gyazo.com/235f710ab3fd906f80768261e793eb13.gif)

In the terminal, try the following commands:

- `nodes` - List all connected nodes.
- `actions` - List all registered service actions.
- `call greeter.hello` - Call the `greeter.hello` action.
- `call greeter.welcome --username dunghd` - Call the `greeter.welcome` action with the `username` parameter.

![https://gyazo.com/3aca1c4e1992ad1c10da8060d7e21a6c.gif](https://gyazo.com/3aca1c4e1992ad1c10da8060d7e21a6c.gif)

This project uses [hygen](http://www.hygen.io/) to generate code templates, saving you time and ensuring consistency across your codebase.

### Adding a New Service

To add a new service to your project, use the following command:

```sh
pnpm generate:service [service-name]
```

### Adding a New Action to a Service

To add a new action to an existing service, use the following command:

```sh
pnpm generate:action [action-name] --service [service-name]
```

### Generating CRUD Services

To generate a service with Create, Read, Update, and Delete (CRUD) operations, use the following command:

```sh
pnpm generate:crud [service-name]
```

## API Documentation

This template also reads your [JSDoc-annotated](https://github.com/Surnet/swagger-jsdoc/blob/v6/docs/README.md) source code and generates an OpenAPI (Swagger) specification.

Run the following command to generate the Swagger documentation:

```sh
pnpm generate:swagger
```

Open the http://localhost:3000/docs URL in your browser, you will see the Swagger UI as

![https://gyazo.com/a4fe2413414c94dde636a531eee1a4a0.gif](https://gyazo.com/a4fe2413414c94dde636a531eee1a4a0.gif)

## TypeScript SDK Generation

This template automatically generates a type-safe TypeScript SDK from your OpenAPI specification using [@hey-api/openapi-ts](https://heyapi.dev/openapi-ts/).

### Generating the SDK

To generate the TypeScript SDK from your OpenAPI specification:

```sh
pnpm generate:sdk
```

This command:

1. Reads the OpenAPI specification from `public/docs/open-api.json`
2. Generates TypeScript client code in `generated/sdk/`
3. Creates type-safe functions for all your API endpoints

### Using the Generated SDK

The generated SDK provides a type-safe client for your API:

```typescript
import {
    client,
    getApiGreeterHello,
    getApiGreeterWelcome,
    postApiProductCart,
} from "./generated/sdk";

// Configure the client
client.setConfig({
    baseUrl: "http://localhost:3000",
});

// Use type-safe API calls
const hello = await getApiGreeterHello();
const welcome = await getApiGreeterWelcome({
    query: { username: "John" },
});
const cartItem = await postApiProductCart({
    body: { name: "Product", qty: 1 },
});
```

### SDK Regeneration Process

The SDK is automatically regenerated:

- **During typecheck**: `pnpm typecheck` runs `generate:sdk` first
- **In CI/CD**: The deploy workflow ensures SDK is current before type checking
- **After API changes**: Regenerate manually when you modify services or DTOs

### Configuration

SDK generation is configured in `openapi-ts.config.ts`:

```typescript
export default defineConfig({
    input: "public/docs/open-api.json", // OpenAPI spec source
    output: "generated/sdk", // Output directory
    plugins: ["@hey-api/client-fetch"], // HTTP client plugin
    exportCore: true, // Export client utilities
});
```

**Note**: The `generated/` directory is in `.gitignore` and should not be committed. The SDK is generated fresh in CI/CD and during development.

## Run tests

```sh
pnpm test
```

## Deployment

Production runs in the existing Dokku app `moleculer` on `dokku@95.111.232.131`, at https://moleculer.itman.fyi.
The app uses the root Dockerfile, deploy branch `main`, two web processes and port `8888`.
Read-only preflight confirmed `TRANSPORTER=TCP` and the configured port map
`http:80:8888 https:443:8888`. Preserve those settings; no port-map reset is needed.
Forks must change the target host, app, domain and verified host-key file before using this workflow.

The workflow validates lint, TypeScript, unit tests and the Docker image on pull requests and pushes to `main`.
Deployment from GitHub is an explicit **Run workflow** action on `main`, not an automatic push deployment.
Before using it, obtain owner approval to register an app-scoped Dokku key and store it as `DOKKU_SSH_PRIVATE_KEY`.
Until then, deploy manually from a trusted workstation with existing authorized SSH access.
The server's verified Ed25519 host key is pinned in `.github/dokku_known_hosts`; do not disable host-key checking.
Fly credentials and registry access are not used.

For an authorized manual deployment from a trusted workstation:

```sh
git push ssh://dokku@95.111.232.131/moleculer main:main
curl --fail https://moleculer.itman.fyi/api/health/check
```

The container installs production dependencies only, including the TypeScript runner and DTO generator.
It sets `NODE_ENV=production`, `TRANSPORTER=TCP` and a default `PORT=8888`, which is the container port of Dokku's `http:80:8888 https:43:8888` map.
Docker Compose and Kubernetes pin `PORT=3000` explicitly, so the image default only applies to deployments that do not set the port themselves.
The health response includes `X-Revision` from Dokku's per-deploy `GIT_REV`; the workflow requires it to equal the dispatched commit.
On the verified Dokku 0.37.7 host with the docker-local scheduler, startup checks verify broker health and the greeter route before switching traffic to the new containers.
Those checks come from `app.json` and need Dokku 0.31.0 or newer, so the deploy job fails when the host reports an older version.
Keep the existing domain, routing and process scale when deploying; no app recreation or volume cleanup is required.

## GitHub Actions

GitHub Actions validates pull requests and pushes to `main`; a manually dispatched run can deploy `main` after its checks pass.
There is no staging deployment target configured for `dev`.

## Useful links

- Moleculer website: https://moleculer.services/
- Moleculer Documentation: https://moleculer.services/docs/0.15/

## NPM scripts

- `pnpm dev`: Start development mode (load all services locally with hot-reload & watch)
- `pnpm start`: Start production mode (set `SERVICES` env variable to load certain services)
- `pnpm cli`: Start a CLI and connect to production. Don't forget to set production namespace with `--ns` argument in script
- `pnpm ci`: Run continuous test mode with watching
- `pnpm test`: Run tests & generate coverage report
- `pnpm dc:up`: Start the stack with Docker Compose
- `pnpm dc:down`: Stop the stack with Docker Compose

## Pre-commit hooks

This template uses [Pre-commit](https://pre-commit.com/) to run checks before you commit your code. This ensures that your code is formatted correctly and passes all tests before you push it to your repository.

```sh
pre-commit install
```

To run the checks manually, use the following command:

```sh
pre-commit run --all-files
```

CI runs the same hooks and fails if a hook reports an error or changes a file. It does not commit or push fixes. Run the hooks locally. If Biome reports errors, run `pnpm check` to apply formatting and safe fixes. Resolve any remaining errors and rerun the hooks. Review the changes and commit them before pushing. The Biome CI hook uses the Biome 2 version pinned in `.pre-commit-config.yaml`.

## Pullfrog reviews

The repository uses the [official Pullfrog workflow](https://docs.pullfrog.com/getting-started) in `.github/workflows/pullfrog.yml` instead of the Claude workflows. The Pullfrog GitHub App receives PR events and dispatches this workflow; adding a `pull_request` trigger is not required. Other review tools are unchanged.

Repository owner setup:

1. Sign in to the [Pullfrog console](https://pullfrog.com/console) and install or authorize its GitHub App for this repository.
2. Choose model access in the console. [Public repositories use the platform free](https://docs.pullfrog.com/billing), but model tokens are separate. A [free model](https://docs.pullfrog.com/model-access) still needs an `OPENCODE_API_KEY`; paid providers or Router credit can incur costs. Funded OSS model access requires acceptance into the program for repositories with more than 1,000 stars. No paid access is configured by this workflow.
3. After the workflow reaches the default branch through normal review and required checks, select **Verify manual installation** in the repository console.
4. Under **Automations → Review PRs**, enable automatic reviews, re-review on push, and **Include PRs opened by bots** so Renovate PRs are reviewed. Enable the `pullfrog` run-status and `pullfrog-approval` verdict checks. Leave auto-merge off.
5. Send the console's test prompt, then request a review on a PR with `@pullfrog`. Verify the completed workflow, published review, and both checks on the exact PR head before treating the integration as working.
6. If branch protection requires `claude-review`, an owner must migrate that requirement to the verified Pullfrog checks without weakening other required checks or approvals. Do not remove a required gate just to merge this installation change. The integration is not verified merely because the old Claude check stops running.

See [Pullfrog PR review settings and status checks](https://docs.pullfrog.com/pr-reviews). The workflow needs `id-token: write` for authentication and checks out code without persisted Git credentials. It does not use `CLAUDE_CODE_OAUTH_TOKEN`. Installing the App, choosing model credentials, and configuring review gates are owner actions; repository YAML alone cannot complete them.

## Author

👤 **Dung Huynh**

- Website: https://productsway.com/
- Twitter: [@jellydn](https://twitter.com/jellydn)
- Github: [@jellydn](https://github.com/jellydn)

## Show your support

[![Star History Chart](https://api.star-history.com/svg?repos=jellydn/moleculer-typescript-template&type=Date)](https://star-history.com/#jellydn/moleculer-typescript-template)

Give a ⭐️ if this project helped you!

[![kofi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/dunghd)
[![paypal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/dunghd)
[![buymeacoffee](https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/dunghd)

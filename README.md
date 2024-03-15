# Welcome to moleculer-typescript-template 👋

![Version](https://img.shields.io/badge/version-0.1.1-blue.svg?cacheSeconds=2592000)
![Prerequisite](https://img.shields.io/badge/node-%3E%3D%2014.x.x-blue.svg)
[![Twitter: jellydn](https://img.shields.io/twitter/follow/jellydn.svg?style=social)](https://twitter.com/jellydn)

> My Moleculer-based microservices project

[![Moleculer - Progressive microservices framework for Node.js ](https://img.youtube.com/vi/peb2OflRu-4/0.jpg)](https://www.youtube.com/watch?v=peb2OflRu-4)

<!-- [![Deploy](https://button.deta.dev/1/svg)](https://go.deta.dev/deploy?repo=https://github.com/jellydn/moleculer-typescript-template) -->

## Prerequisites

-   node >= 18.17.x

## Init new project

```sh
npx degit jellydn/moleculer-typescript-template [PROJECT-NAME]
```

## Features

-   ⚡️ Progressive microservices framework for Node.js.
    [Moleculer](https://moleculer.services/) with [Typescript](https://www.typescriptlang.org/) template
-   📦 [hygen](http://www.hygen.io/) - The scalable code generator that saves you time.
-   🦾 [pino](https://getpino.io) - super fast, all natural json logger
-   🔥 [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc/blob/v6/docs/README.md) - Generates swagger/openapi specification based on jsDoc comments and YAML files.
-   ✨ [moleculer-zod-validator](https://github.com/TheAppleFreak/moleculer-zod-validator) - A validator for the Moleculer microservice framework to allow the use of [Zod](https://zod.dev/).

## Install

```sh
pnpm install
```

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

-   `nodes` - List all connected nodes.
-   `actions` - List all registered service actions.
-   `call greeter.hello` - Call the `greeter.hello` action.
-   `call greeter.welcome --username dunghd` - Call the `greeter.welcome` action with the `username` parameter.

![https://gyazo.com/3aca1c4e1992ad1c10da8060d7e21a6c.gif](https://gyazo.com/3aca1c4e1992ad1c10da8060d7e21a6c.gif)

## Code generator

Add new service to your project with below command

```sh
pnpm generate:service [service-name]
pnpm generate:action [action-name] --service [service-name]
```

Generates CRUD services with below command

```sh
pnpm generate:crud [service-name]
```

## API Documentation

This template also reads your [JSDoc-annotated](https://github.com/Surnet/swagger-jsdoc/blob/v6/docs/README.md) source code and generates an OpenAPI (Swagger) specification.

Open the http://localhost:3000/docs URL in your browser, you will see the Swagger UI as

![https://gyazo.com/a4fe2413414c94dde636a531eee1a4a0.gif](https://gyazo.com/a4fe2413414c94dde636a531eee1a4a0.gif)

## Run tests

```sh
pnpm test
```

## Deployment

This template comes with two GitHub Actions that handle automatically deploying your app to production and staging environments.

Prior to your first deployment, you'll need to do a few things:

-   [Install Fly](https://fly.io/docs/getting-started/installing-flyctl/)

-   Sign up and log in to Fly

    ```sh
    fly auth signup
    ```

-   Create two apps on Fly, one for staging and one for production:

    ```sh
    fly create moleculer-typescript
    fly create moleculer-typescript-staging
    ```

-   Create a new [GitHub Repository](https://repo.new)

-   Add a `FLY_API_TOKEN` to your GitHub repo. To do this, go to your user settings on Fly and create a new [token](https://web.fly.io/user/personal_access_tokens/new), then add it to [your repo secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) with the name `FLY_API_TOKEN`.

Now that every is set up you can commit and push your changes to your repo. Every commit to your `main` branch will trigger a deployment to your production environment, and every commit to your `dev` branch will trigger a deployment to your staging environment.

## GitHub Actions

We use GitHub Actions for continuous integration and deployment. Anything that gets into the `main` branch will be deployed to production after running tests/build/etc. Anything in the `dev` branch will be deployed to staging.

## Useful links

-   Moleculer website: https://moleculer.services/
-   Moleculer Documentation: https://moleculer.services/docs/0.14/

## NPM scripts

-   `pnpm dev`: Start development mode (load all services locally with hot-reload & watch)
-   `pnpm start`: Start production mode (set `SERVICES` env variable to load certain services)
-   `pnpm cli`: Start a CLI and connect to production. Don't forget to set production namespace with `--ns` argument in script
-   `pnpm ci`: Run continuous test mode with watching
-   `pnpm test`: Run tests & generate coverage report
-   `pnpm dc:up`: Start the stack with Docker Compose
-   `pnpm dc:down`: Stop the stack with Docker Compose

## Author

👤 **Dung Huynh**

-   Website: https://productsway.com/
-   Twitter: [@jellydn](https://twitter.com/jellydn)
-   Github: [@jellydn](https://github.com/jellydn)

## Show your support

[![Stargazers repo roster for @jellydn/moleculer-typescript-template](https://reporoster.com/stars/jellydn/moleculer-typescript-template)](https://github.com/jellydn/moleculer-typescript-template/stargazers)

Give a ⭐️ if this project helped you!

# Welcome to moleculer-typescript-template 👋

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000)
![Prerequisite](https://img.shields.io/badge/node-%3E%3D%2014.x.x-blue.svg)
[![Twitter: jellydn](https://img.shields.io/twitter/follow/jellydn.svg?style=social)](https://twitter.com/jellydn)

> My Moleculer-based microservices project

## Prerequisites

-   node >= 14.x.x

## Init new project

```sh
npx degit jellydn/moleculer-typescript-template [PROJECT-NAME]
```

## Install

```sh
yarn install
```

## Usage

```sh
yarn dev
```

After starting, open the http://localhost:3000/ URL in your browser.
On the welcome page you can test the generated services via API Gateway and check the nodes & services.

```sh
yarn cli
```

In the terminal, try the following commands:

-   `nodes` - List all connected nodes.
-   `actions` - List all registered service actions.
-   `call greeter.hello` - Call the `greeter.hello` action.
-   `call greeter.welcome --name John` - Call the `greeter.welcome` action with the `name` parameter.

Add new service to your project with below command

```sh
yarn generate:service [service-name]
```

## Run tests

```sh
yarn test
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

-   `yarn dev`: Start development mode (load all services locally with hot-reload & watch)
-   `yarn start`: Start production mode (set `SERVICES` env variable to load certain services)
-   `yarn cli`: Start a CLI and connect to production. Don't forget to set production namespace with `--ns` argument in script
-   `yarn ci`: Run continuous test mode with watching
-   `yarn test`: Run tests & generate coverage report
-   `yarn dc:up`: Start the stack with Docker Compose
-   `yarn dc:down`: Stop the stack with Docker Compose

## Author

👤 **Dung Huynh**

-   Website: https://productsway.com/
-   Twitter: [@jellydn](https://twitter.com/jellydn)
-   Github: [@jellydn](https://github.com/jellydn)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_

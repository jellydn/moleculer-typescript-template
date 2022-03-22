# Welcome to moleculer-typescript-template 👋

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000)
![Prerequisite](https://img.shields.io/badge/node-%3E%3D%2014.x.x-blue.svg)
[![Twitter: jellydn](https://img.shields.io/twitter/follow/jellydn.svg?style=social)](https://twitter.com/jellydn)

> My Moleculer-based microservices project

## Prerequisites

-   node >= 14.x.x

## Install

```sh
yarn install
```

## Usage

```sh
yarn dev
```

Start the project with `npm run dev` command.
After starting, open the http://localhost:3000/ URL in your browser.
On the welcome page you can test the generated services via API Gateway and check the nodes & services.

In the terminal, try the following commands:

-   `nodes` - List all connected nodes.
-   `actions` - List all registered service actions.
-   `call greeter.hello` - Call the `greeter.hello` action.
-   `call greeter.welcome --name John` - Call the `greeter.welcome` action with the `name` parameter.

## Run tests

```sh
yarn test
```

## Useful links

-   Moleculer website: https://moleculer.services/
-   Moleculer Documentation: https://moleculer.services/docs/0.14/

## NPM scripts

-   `yarn dev`: Start development mode (load all services locally with hot-reload & REPL)
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

---
to: services/<%= name %>.service.ts
---
import type { Context, Service, ServiceSchema } from "moleculer";
import { ZodParams } from "moleculer-zod-validator";

import { validateParams } from "./common";

export type ActionHelloParams = {
	name: string;
};

type ServiceSettings = {
	defaultName: string;
};

type ServiceMethods = {
	uppercase(str: string): string;
};

type ServiceThis = Service<ServiceSettings> & ServiceMethods;

const <%= name %>Service: ServiceSchema<ServiceSettings, ServiceThis> = {
	name: "<%= name %>",

	/**
	 * Settings
	 */
	settings: {
		defaultName: "Moleculer",
	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {
		/**
		 * Say a 'Hello' action.
		 * @swagger
		 * /api/<%= name %>/hello:
		 *   get:
		 *     description: Returns a greeting message
		 *     tags:
		 *     - <%= name %>
		 *     responses:
		 *       200:
		 *         description: Hello message
		 *         content:
		 *          text/plain:
		 *           schema:
		 *            type: string
		 *            example: Hello Moleculer
		 */
		hello: {
			rest: {
				method: "GET",
				path: "/hello",
			},
			handler(this: ServiceThis): string {
				return `Hello ${this.settings.defaultName}`;
			},
		},

		/**
		 * Welcome, a username
		 * @swagger
		 * /api/<%= name %>/welcome/{name}:
		 *   get:
		 *     description: Returns a welcome message for a user
		 *     tags:
		 *     - <%= name %>
		 *     parameters:
		 *       - in: path
		 *         name: name
		 *         required: true
		 *         schema:
		 *           type: string
		 *         description: User name
		 *     responses:
		 *      200:
		 *         description: Welcome message
		 *         content:
		 *          text/plain:
		 *           schema:
		 *            type: string
		 *            example: Welcome, John
		 *      422:
		 *         description: Validation error
		 */
		welcome: {
			rest: "GET /welcome/:name",
			params: {
				name: "string",
			},
			hooks: {
				before(ctx) {
					this.logger.info("Validating parameters for welcome action");
					// Add your validation schema here if needed
					// validateParams(ctx, yourSchema);
				},
			},
			handler(
				this: ServiceThis,
				ctx: Context<ActionHelloParams>,
			): string {
				this.logger.info(
					"welcome action called with parameters: %o",
					ctx.params
				);
				return `Welcome, ${ctx.params.name}`;
			},
		},
	},

	/**
	 * Events
	 */
	events: {},

	/**
	 * Methods
	 */
	methods: {
		/**
		 * A simple method example.
		 *
		 * @example
		 * 	let upper = this.uppercase("John");
		 * 		// "JOHN"
		 * 			*/
		uppercase(str: string): string {
			return str.toUpperCase();
		},
	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {
		this.logger.info(`The ${this.name} service created.`);
	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {
		this.logger.info(`The ${this.name} service started.`);
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {
		this.logger.info(`The ${this.name} service stopped.`);
	},
};

export default <%= name %>Service;


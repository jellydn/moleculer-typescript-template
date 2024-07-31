---
to: services/<%= name %>.service.ts
---
import type { Context, Service, ServiceSchema } from "moleculer";

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
		 *
		 * @returns
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
		 *
		 * @param {String} name - User name
		 */
		welcome: {
			rest: "GET /welcome/:name",
			params: {
				name: "string",
			},
			handler(
				this: ServiceThis,
				ctx: Context<ActionHelloParams>,
			): string {
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


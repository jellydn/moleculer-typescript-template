---
to: services/<%= name %>/<%= name %>.service.ts
---
import type { Service, ServiceSchema } from "moleculer";

import createAction from "./actions/create<%= h.capitalize(name) %>.action";
import editAction from "./actions/update<%= h.capitalize(name) %>.action";
import viewAction from "./actions/view<%= h.capitalize(name) %>.action";
import deleteAction from "./actions/delete<%= h.capitalize(name) %>.action";
import listAction from "./actions/list<%= h.capitalize(name) %>.action";

type ServiceSettings = {
	defaultName: string;
};

type ServiceMethods = {
	uppercase(str: string): string;
};

type ServiceThis = Service<ServiceSettings> & ServiceMethods;

/**
 * Define common components for the <%= name %> service.
 *
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
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
		create: createAction,
		update: editAction,
		view: viewAction,
		delete: deleteAction,
    list: listAction,
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


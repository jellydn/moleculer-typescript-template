import type { Context, ServiceSchema } from "moleculer";

const greeterService: ServiceSchema = {
	name: "greeter",

	/**
	 * Settings
	 */
	settings: {},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {
		/**
		 * @swagger
		 * /api/greeter/hello:
		 *   get:
		 *     description: Returns the Hello Moleculer
		 *     responses:
		 *       200:
		 *         description: Hello Moleculer
		 */
		hello: {
			rest: {
				method: "GET",
				path: "/hello",
			},
			async handler() {
				return "Hello Moleculer";
			},
		},

		/**
		 * Welcome, a username
		 *
		 * @param {String} name - User name
		 * @swagger
		 * /api/greeter/welcome:
		 *   get:
		 *     description: Returns Welcome, a username
		 *     parameters:
		 *     - name: username
		 *       description: a username
		 *       in: query
		 *       required: true
		 *       type: string
		 *     responses:
		 *      200:
		 *         description: Welcome, a username
		 *      422:
		 *         description: Invalid username
		 */
		welcome: {
			rest: "/welcome",
			params: {
				username: { type: "string", min: 3, max: 25 },
			},
			/** @param {Context} ctx  */
			async handler(
				ctx: Context<{
					username: string;
				}>
			) {
				return `Welcome, ${ctx.params.username}`;
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
	methods: {},

	/**
	 * Service created lifecycle event handler
	 */
	created() {
		this.logger.info("[greeter] The service was created");
	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {
		this.logger.info("[greeter] The service was started");
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {
		this.logger.info("[greeter] The service was stopped");
	},
};

export default greeterService;

import { type Context, type Service, type ServiceSchema } from "moleculer";
import { ZodParams } from "moleculer-zod-validator";
import { logger } from "../logger";
import { validateParams } from "./common";
import { welcomeSchema } from "./dtos";

type GreeterSettings = {
	defaultName: string;
};

type GreeterMethods = {
	/**
	 * Say a 'Hello' to a user.
	 * @example
	 * sayHello("John Doe");
	 * // Hello John Doe
	 **/
	sayHello(name: string): string;
};

type GreeterThis = Service<GreeterSettings> & GreeterMethods;

const getterValidator = new ZodParams(welcomeSchema);

/**
 * @swagger
 * components:
 *  schemas:
 *    welcomeResponseDTO:
 *      type: string
 *      example: Welcome, dunghd
 *  parameters:
 *	  username:
 *	    name: username
 *	    in: query
 *	    description: User name
 *	    required: true
 *	    schema:
 *	      type: string
 *	      minLength: 6
 *	      maxLength: 25
 */
const greeterService: ServiceSchema<GreeterSettings, GreeterThis> = {
	name: "greeter",

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
		 * @swagger
		 * /api/greeter/hello:
		 *   get:
		 *     description: Returns the Hello Moleculer
		 *     tags:
		 *     - greeter
		 *     responses:
		 *       200:
		 *         description: Hello Moleculer
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
			/**
			 * @returns Hello Moleculer
			 */
			async handler(this: GreeterThis) {
				return this.sayHello(this.settings.defaultName);
			},
		},

		/**
		 * Welcome, a username
		 *
		 * @param name - User name
		 * @swagger
		 * /api/greeter/welcome:
		 *   get:
		 *     description: Returns Welcome, a username
		 *     tags:
		 *     - greeter
		 *     parameters:
		 *     - $ref: '#/components/parameters/username'
		 *       in: query
		 *     responses:
		 *      200:
		 *         description: Welcome, a username
		 *         content:
		 *          text/plain:
		 *           schema:
		 *	           $ref: '#/components/schemas/welcomeResponseDTO'
		 *      422:
		 *         description: Invalid username
		 */
		welcome: {
			rest: "/welcome",
			params: {
				username: { type: "string", min: 4, max: 25 },
			},
			hooks: {
				before: [
					(ctx: Context) => {
						logger.info("Validating parameters for hello action");
						validateParams(ctx, welcomeSchema);
					},
				],
			},
			/**
			 * @param ctx - Request context
			 * @returns Welcome, a username
			 */
			async handler(
				this: GreeterThis,
				ctx: Context<typeof getterValidator.context>
			) {
				this.logger.info(
					"welcome action called with parameters: %o",
					ctx.params
				);
				// Validate parameters
				const { username } = ctx.params;
				return `Welcome, ${username}`;
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
		sayHello(name: string) {
			return `Hello ${name}`;
		},
	},

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

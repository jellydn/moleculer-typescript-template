import type { Context, Service, ServiceSchema } from "moleculer";
import { ZodParams } from "moleculer-zod-validator";
import { z } from "zod";

type ServiceSettings = Record<string, unknown>;

type ServiceMethods = Record<string, unknown>;

type ServiceThis = Service<ServiceSettings> & ServiceMethods;

const orderItemValidator = new ZodParams({
	name: z.string(),
	qty: z.number(),
});

const productService: ServiceSchema<ServiceSettings> = {
	name: "product",

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
		 * Add a product to the cart
		 */
		addToCart: {
			rest: {
				method: "POST",
				path: "/cart",
			},
			params: orderItemValidator.schema,
			handler(
				this: ServiceThis,
				ctx: Context<typeof orderItemValidator.context>,
			) {
				this.logger.info("addToCart called");
				const { name, qty } = ctx.params;
				return {
					success: true,
					message: `You added ${qty} ${name} to your cart`,
				};
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

export default productService;

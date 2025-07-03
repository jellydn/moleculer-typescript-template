import type { Context, Service, ServiceSchema } from "moleculer";
import { ZodParams } from "moleculer-zod-validator";

import { validateParams } from "../common";
import { addCartSchema } from "../dtos";
import { InMemoryProductRepository } from "./product.repository";

type ServiceSettings = Record<string, unknown>;

type ServiceMethods = Record<string, unknown>;

type ServiceThis = Service<ServiceSettings> &
	ServiceMethods & { repository: InMemoryProductRepository };

const orderItemValidator = new ZodParams(addCartSchema);

const productService: ServiceSchema<ServiceSettings, ServiceThis> = {
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
		 * @swagger
		 * /api/product/cart:
		 *  post:
		 *	  description: Add a product to the cart
		 *	  tags:
		 *	   - product
		 *	  requestBody:
		 *	   required: true
		 *	   content:
		 *	    application/json:
		 *	     schema:
		 *	      $ref: '#/components/schemas/addCartDTO'
		 *	  responses:
		 *	   200:
		 *	    description: Product added to cart
		 *	    content:
		 *	     application/json:
		 *	      schema:
		 *	       $ref: '#/components/schemas/addCartResponseDTO'
		 *	   422:
		 *	    description: Validation error
		 */
		addToCart: {
			rest: {
				method: "POST",
				path: "/cart",
			},
			hooks: {
				before(ctx) {
					this.logger.info(
						"Validating parameters for addToCart action"
					);
					validateParams(ctx, addCartSchema);
				},
			},
			handler(
				this: ServiceThis,
				ctx: Context<typeof orderItemValidator.context>
			) {
				this.logger.info(
					"addToCart action called with parameters: %o",
					ctx.params
				);
				const { name, qty, billing } = ctx.params;
				return {
					success: true,
					message: `You added ${qty} ${name} to your cart`,
					billing,
				};
			},
		},
		/**
		 * Create a new product
		 * @swagger
		 * /api/product:
		 *  post:
		 *	  description: Create a new product
		 *	  tags:
		 *	   - product
		 *	  requestBody:
		 *	   required: true
		 *	   content:
		 *	    application/json:
		 *	     schema:
		 *	      $ref: '#/components/schemas/addCartDTO'
		 *	  responses:
		 *	   201:
		 *	    description: Product created successfully
		 *	    content:
		 *	     application/json:
		 *	      schema:
		 *	       $ref: '#/components/schemas/CreateProductResponseSchemaDTO'
		 *	   422:
		 *	    description: Validation error
		 *	    content:
		 *	     application/json:
		 *	      schema:
		 *	       $ref: '#/components/schemas/errorResponseDTO'
		 *	   500:
		 *	    description: Internal server error
		 *	    content:
		 *	     application/json:
		 *	      schema:
		 *	       $ref: '#/components/schemas/errorResponseDTO'
		 */
		create: {
			// Example of a new action
			rest: "POST /",
			hooks: {
				before(ctx) {
					this.logger.info("Validating parameters for create action");
					validateParams(ctx, addCartSchema);
				},
			},
			async handler(
				this: ServiceThis,
				ctx: Context<typeof orderItemValidator.context>
			) {
				// Usa el repositorio
				const newProduct = await this.repository.create(ctx.params);
				return {
					success: true,
					message: "Product created successfully",
					product: newProduct,
				};
			},
		},
		/**
		 * Get all products
		 * @swagger
		 * /api/product:
		 *  get:
		 *	  description: Get all products
		 *	  tags:
		 *	   - product
		 *	  responses:
		 *	   200:
		 *	    description: List of products
		 *	    content:
		 *	     application/json:
		 *	      schema:
		 *	       type: array
		 *	       items:
		 *	        $ref: '#/components/schemas/ProductSchemaDTO'
		 */
		getAll: {
			rest: "GET /",
			async handler(this: ServiceThis) {
				const products = await this.repository.findAll();
				return products;
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
		this.repository = new InMemoryProductRepository();
		this.logger.info("Product repository initialized.");
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

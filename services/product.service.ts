import {
	type Context,
	Errors,
	type GenericObject,
	type Service,
	type ServiceSchema,
} from "moleculer";
import { ZodParams } from "moleculer-zod-validator";
import { z } from "zod";

import { logger } from "../logger";
import { addCartSchema } from "./dtos/product.dto";
import { InMemoryProductRepository } from "./product/product.repository";

type ServiceSettings = Record<string, unknown>;

type ServiceMethods = Record<string, unknown>;

type ServiceThis = Service<ServiceSettings> & ServiceMethods;

const orderItemValidator = new ZodParams(addCartSchema);

// TODO: Move this to a shared utility
const validateParams = (
	ctx: Context<unknown, Record<string, unknown>, GenericObject>,
	schema: typeof addCartSchema
) => {
	const compiled = z.object(schema).strict();
	try {
		const parsedParams = compiled.parse(ctx.params);
		logger.info("Validated parameters: %o", parsedParams);
	} catch (err) {
		if (err instanceof z.ZodError)
			throw new Errors.ValidationError(
				"Parameters validation error!",
				"VALIDATION_ERROR",
				err.issues
			);

		throw err;
	}
};

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
			// Nueva acción como ejemplo
			rest: "POST /",
			hooks: {
				before(ctx) {
					this.logger.info(
						"Validating parameters for addToCart action"
					);
					validateParams(ctx, addCartSchema);
				},
			},
			async handler(
				this: ServiceThis,
				ctx: Context<typeof addCartSchema>
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

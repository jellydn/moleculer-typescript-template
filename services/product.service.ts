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

type ServiceSettings = Record<string, unknown>;

type ServiceMethods = Record<string, unknown>;

type ServiceThis = Service<ServiceSettings> & ServiceMethods;

const orderItemValidator = new ZodParams(addCartSchema);

// TODO: Move this to a shared utility
const validateParams = (
    ctx: Context<unknown, Record<string, unknown>, GenericObject>,
    schema: typeof addCartSchema,
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
                err.issues,
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
                    this.logger.info("Validating parameters for addToCart action");
                    validateParams(ctx, addCartSchema);
                },
            },
            handler(this: ServiceThis, ctx: Context<typeof orderItemValidator.context>) {
                this.logger.info("addToCart action called with parameters: %o", ctx.params);
                const { name, qty, billing } = ctx.params;
                return {
                    success: true,
                    message: `You added ${qty} ${name} to your cart`,
                    billing,
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

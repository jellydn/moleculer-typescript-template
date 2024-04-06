import { type Context, Errors, type Service, type ServiceSchema } from "moleculer";
import { ZodParams } from "moleculer-zod-validator";
import { z } from "zod";

import { addCartSchema } from "./dtos/product.dto";

type ServiceSettings = Record<string, unknown>;

type ServiceMethods = Record<string, unknown>;

type ServiceThis = Service<ServiceSettings> & ServiceMethods;

const orderItemValidator = new ZodParams(addCartSchema);

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
         */
        addToCart: {
            rest: {
                method: "POST",
                path: "/cart",
            },
            hooks: {
                before(ctx) {
                    this.logger.info("Before hook called");
                    const compiled = z.object(addCartSchema).strict();
                    try {
                        const parsedParams = compiled.parse(ctx.params);
                        this.logger.info("This is the result after validation %o", parsedParams);
                    } catch (err) {
                        if (err instanceof z.ZodError)
                            throw new Errors.ValidationError(
                                "Parameters validation error!",
                                "VALIDATION_ERROR",
                                err.issues,
                            );

                        throw err;
                    }
                },
            },
            handler(this: ServiceThis, ctx: Context<typeof orderItemValidator.context>) {
                this.logger.info("addToCart called %o", ctx.params);
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

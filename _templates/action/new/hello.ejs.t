---
to: services/<%= service %>/actions/<%= name %>.action.ts
---
import type { Context, ServiceActionsSchema } from "moleculer";
import { validateParams } from "../../common";

/**
 * The <%= name %> action.
 *
 * @swagger
 * /api/<%= service %>/<%= name %>:
 *   get:
 *     summary: Returns a greeting and calculates the age in days.
 *     tags:
 *       - <%= service %>
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name to greet.
 *       - in: query
 *         name: age
 *         schema:
 *           type: number
 *         required: true
 *         description: The age of the person to calculate the days.
 *     responses:
 *       200:
 *         description: A greeting message and the age in days.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hello John, you are 10950 days old!"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       422:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Parameters validation error!
 */
const <%= name %>Action: ServiceActionsSchema = {
	rest: {
		method: "GET",
		path: "/<%= name %>",
	},
	params: {
		name: "string",
		age: "number",
	},
	hooks: {
		before(ctx) {
			this.logger.info('Validating parameters for <%= name %> action');
			// Add your validation schema here
			// validateParams(ctx, your<%= h.capitalize(name) %>Schema);
		},
	},
	handler: <%= name %>Handler,
};

/**
 * Handler for the <%= name %> action.
 */
function <%= name %>Handler(
	ctx: Context<{
		name: string;
		age: number;
	}>,
): { message: string; success: boolean } {
	// Calculate the age in days
	const ageInDays = ctx.params.age * 365;

	return {
		message: `Hello ${ctx.params.name}, you are ${ageInDays} days old!`,
		success: true,
	};
}

export default <%= name %>Action;


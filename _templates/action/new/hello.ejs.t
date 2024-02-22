---
to: services/<%= service %>/actions/<%= name %>.action.ts
---
import type { Context, ServiceActionsSchema } from "moleculer";

/**
 * The <%= name %> action.
 *
 * @swagger
 * /welcome:
 *   get:
 *     summary: Returns a greeting and calculates the age in days.
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
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Hello John, you are 10950 days old!"
 */
const <%= name %>Action: ServiceActionsSchema = {
	rest: {
		method: "GET",
		path: "/welcome",
	},
	params: {
		name: "string",
		age: "number",
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
): string {
	// Calculate the age in days
	const ageInDays = ctx.params.age * 365;

	return `Hello ${ctx.params.name}, you are ${ageInDays} days old!`;
}

export default <%= name %>Action;


---
to: services/<%= name %>/actions/create<%= h.capitalize(name) %>.action.ts
---

import type { Context, ServiceActionsSchema } from 'moleculer';

/**
 * Handler for the create action.
 */
function createHandler(
  ctx: Context<{
    <%= name %>: Record<string,unknown>;
  }>,
) {
  return {
    message: 'Created successfully',
    data: ctx.params,
  };
}

/**
 * The create project action.
 *
 * @swagger
 * /api/<%= name %>:
 *   post:
 *     summary: Create a new <%= name %>.
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - <%= name %>
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name to greet.
 *               age:
 *                 type: number
 *                 description: The age of the person to calculate the days.
 *     responses:
 *       200:
 *         description: <%= name %> created successfully.
 */
const create<%= h.capitalize(name) %>Action: ServiceActionsSchema = {
  rest: {
    method: 'POST',
    path: '/',
  },
  auth: true,
  permissions: [],
  params: {
    <%= name %>: { type: "object" }
  },
  handler: createHandler,
};

export default create<%= h.capitalize(name) %>Action;

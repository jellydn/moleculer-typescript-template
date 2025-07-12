---
to: services/<%= name %>/actions/create<%= h.capitalize(name) %>.action.ts
---

import type { Context, ServiceActionsSchema } from 'moleculer';
import { validateParams } from '../../common';

/**
 * Handler for the create action.
 */
function createHandler(
  ctx: Context<{
    <%= name %>: Record<string,unknown>;
  }>,
) {
  return {
    success: true,
    message: '<%= h.capitalize(name) %> created successfully',
    data: ctx.params,
  };
}

/**
 * The create <%= name %> action.
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
 *                 description: The name of the <%= name %>.
 *               description:
 *                 type: string
 *                 description: Description of the <%= name %>.
 *     responses:
 *       201:
 *         description: <%= name %> created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: <%= h.capitalize(name) %> created successfully
 *                 data:
 *                   type: object
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
 *       500:
 *         description: Internal server error
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
  hooks: {
    before(ctx) {
      this.logger.info('Validating parameters for create<%= h.capitalize(name) %> action');
      // Add your validation schema here
      // validateParams(ctx, your<%= h.capitalize(name) %>Schema);
    },
  },
  handler: createHandler,
};

export default create<%= h.capitalize(name) %>Action;

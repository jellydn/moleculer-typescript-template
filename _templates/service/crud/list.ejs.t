---
to: services/<%= name %>/actions/list<%= h.capitalize(name) %>.action.ts
---

import type { Context, ServiceActionsSchema } from 'moleculer';
import { validateParams } from '../../common';

/**
 * Handler for the list action.
 */
function listHandler(
  ctx: Context<{
    page?: string;
    limit?: string;
  }>
) {
  const page = parseInt(ctx.params.page || '1', 10);
  const limit = parseInt(ctx.params.limit || '10', 10);

  return {
    success: true,
    data: [],
    pagination: {
      page,
      limit,
      total: 0,
    },
  };
}

/**
 * The list action.
 *
 * @swagger
 * /api/<%= name %>:
 *   get:
 *     summary: Return a list of <%= name %>.
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - <%= name %>
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *          type: string
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: The <%= name %> list.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: number
 *                     limit:
 *                       type: number
 *                     total:
 *                       type: number
 *       422:
 *         description: Validation error
 */
const list<%= h.capitalize(name) %>Action: ServiceActionsSchema = {
  rest: {
    method: 'GET',
    path: '/',
  },
  auth: true,
  permissions: [],
  params: {
    page: { type: 'string', optional: true },
    limit: { type: 'string', optional: true },
  },
  hooks: {
    before(ctx) {
      this.logger.info('Validating parameters for list<%= h.capitalize(name) %> action');
      // Add your validation schema here if needed
      // validateParams(ctx, yourListSchema);
    },
  },
  handler: listHandler,
};

export default list<%= h.capitalize(name) %>Action;

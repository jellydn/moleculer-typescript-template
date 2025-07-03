---
to: services/<%= name %>/actions/list<%= h.capitalize(name) %>.action.ts
---

import type { Context, ServiceActionsSchema } from 'moleculer';
import { z } from 'zod';
import { validateParams } from '../../common';

/**
 * List parameters validation schema
 */
const listParamsSchema = z.object({
  page: z.string().optional().default('1').transform((val) => {
    const parsed = parseInt(val, 10);
    if (isNaN(parsed) || parsed < 1) {
      throw new Error('Page must be a positive integer');
    }
    return parsed;
  }),
  limit: z.string().optional().default('10').transform((val) => {
    const parsed = parseInt(val, 10);
    if (isNaN(parsed) || parsed < 1 || parsed > 100) {
      throw new Error('Limit must be a positive integer between 1 and 100');
    }
    return parsed;
  }),
});

/**
 * Handler for the list action.
 */
function listHandler(
  ctx: Context<z.infer<typeof listParamsSchema>>
) {
  const { page, limit } = ctx.params;

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
  hooks: {
    before(ctx) {
      this.logger.info('Validating parameters for list<%= h.capitalize(name) %> action');
      validateParams(ctx, listParamsSchema);
    },
  },
  handler: listHandler,
};

export default list<%= h.capitalize(name) %>Action;

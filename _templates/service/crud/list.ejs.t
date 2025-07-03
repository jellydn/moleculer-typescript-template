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
  page: z.string().optional().transform((val) => val ? parseInt(val, 10) : 1),
  limit: z.string().optional().transform((val) => val ? parseInt(val, 10) : 10),
}).refine((data) => data.page >= 1, {
  message: "Page must be greater than or equal to 1",
  path: ["page"],
}).refine((data) => data.limit >= 1 && data.limit <= 100, {
  message: "Limit must be between 1 and 100",
  path: ["limit"],
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
  params: {
    page: { type: 'string', optional: true },
    limit: { type: 'string', optional: true },
  },
  hooks: {
    before(ctx) {
      this.logger.info('Validating parameters for list<%= h.capitalize(name) %> action');
      validateParams(ctx, listParamsSchema);
    },
  },
  handler: listHandler,
};

export default list<%= h.capitalize(name) %>Action;

---
to: services/<%= name %>/actions/view<%= h.capitalize(name) %>.action.ts
---

import type { Context, ServiceActionsSchema } from 'moleculer';

/**
 * Handler for the view action.
 */
function viewHandler(
  ctx: Context<{
    id: string;
  }>,
) {
  const { id } = ctx.params;
  return {
    id,
  };
}

/**
 * The view action.
 *
 * @swagger
 * /api/<%= name %>/{id}:
 *   get:
 *     summary: Return a <%= name %> by ID.
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - <%= name %>
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the <%= name %> to view.
 *     responses:
 *       200:
 *         description: The <%= name %> was found.
 *       404:
 *        description: The <%= name %> was not found.
 */
const view<%= h.capitalize(name) %>Action: ServiceActionsSchema = {
  rest: {
    method: 'GET',
    path: '/:id',
  },
  auth: true,
  permissions: [],
  params: {
    id: 'string',
  },
  handler: viewHandler,
};

export default view<%= h.capitalize(name) %>Action;

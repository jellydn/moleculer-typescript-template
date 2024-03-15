---
to: services/<%= name %>/actions/delete<%= h.capitalize(name) %>.action.ts
---

import type { Context, ServiceActionsSchema } from 'moleculer';

/**
 * Handler for the delete action.
 */
function deleteHandler(
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
 * The delete action.
 *
 * @swagger
 * /api/<%= name %>/{id}:
 *   delete:
 *     summary: Delete a <%= name %> by ID.
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
 *         description: The ID of the <%= name %> to delete.
 *     responses:
 *       200:
 *         description: Delete <%= name %> successfully.
 */
const delete<%= h.capitalize(name) %>Action: ServiceActionsSchema = {
  rest: {
    method: 'DELETE',
    path: '/:id',
  },
  auth: true,
  permissions: [],
  params: {
    id: 'string',
  },
  handler: deleteHandler,
};

export default delete<%= h.capitalize(name) %>Action;

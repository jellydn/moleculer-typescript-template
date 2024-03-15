---
to: services/<%= name %>/actions/update<%= h.capitalize(name) %>.action.ts
---

import type { Context, ServiceActionsSchema } from 'moleculer';

/**
 * Handler for the update action.
 */
function updateHandler(
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
 * The update action.
 *
 * @swagger
 * /api/<%= name %>/{id}:
 *   put:
 *     summary: Update a <%= name %> by ID.
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
 *         description: The ID of the <%= name %> to update.
 *     responses:
 *       200:
 *         description: Updated <%= name %> successfully.
 */
const update<%= h.capitalize(name) %>Action: ServiceActionsSchema = {
  rest: {
    method: 'PUT',
    path: '/:id',
  },
  auth: true,
  permissions: [],
  params: {
    id: 'string',
  },
  handler: updateHandler,
};

export default update<%= h.capitalize(name) %>Action;

---
to: services/<%= name %>/actions/list<%= h.capitalize(name) %>.action.ts
---

import type { ServiceActionsSchema } from 'moleculer';

/**
 * Handler for the list action.
 */
function listHandler() {
  return [];
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
 *       - in: query
 *         name: limit
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: The <%= name %> list.
 */
const list<%= h.capitalize(name) %>Action: ServiceActionsSchema = {
  rest: {
    method: 'GET',
    path: '/',
  },
  auth: true,
  permissions: [],
  params: {
    page: 'string',
    limit: 'string',
  },
  handler: listHandler,
};

export default list<%= h.capitalize(name) %>Action;

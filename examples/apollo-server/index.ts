import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { useServer } from "graphql-ws/lib/use/ws";
import { createServer } from "http";
import defaultsDeep from "lodash/defaultsDeep";
import { ServiceBroker, type ServiceSchema } from "moleculer";
import { resolve } from "path";
import { WebSocketServer } from "ws";

import { logger } from "../../logger";
import config from "../../moleculer.config";
import apiService from "../../services/api.service";
import { schema } from "./schema";

// Create broker
const broker = new ServiceBroker(config);

// Load other services
const enableServices = ["greeter"];
const folder = __dirname.includes("dist")
	? resolve(__dirname.substring(0, __dirname.indexOf("dist")), "dist")
	: resolve(__dirname, "dist");
enableServices.forEach((serviceName) =>
	broker.loadServices(folder, `**/${serviceName}.service.js`)
);
// Load API Gateway
const svc = broker.createService(
	defaultsDeep(apiService, {
		settings: {
			server: false,
		},
	}) as ServiceSchema
);

// Create express and HTTP server
const app = express();
const httpServer = createServer(app);

// Create websocket server
const wsServer = new WebSocketServer({
	server: httpServer,
	path: "/graphql",
});

// Use ApiGateway as middleware
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
app.use("/", svc.express());

async function main() {
	// Save the returned server's info so we can shut down this server later
	const serverCleanup = useServer({ schema }, wsServer);

	// Create apollo server
	const apolloServer = new ApolloServer({
		schema,
		plugins: [
			// Proper shutdown for the HTTP server.
			ApolloServerPluginDrainHttpServer({ httpServer }),

			// Proper shutdown for the WebSocket server.
			{
				async serverWillStart() {
					return {
						async drainServer() {
							await serverCleanup.dispose();
						},
					};
				},
			},
		],
	});
	await apolloServer.start();
	apolloServer.applyMiddleware({ app });

	// Now that our HTTP server is fully set up, actually listen.
	httpServer.listen(Number(process.env?.PORT ?? 3000), () => {
		logger.warn(
			`🚀 Query endpoint ready at http://localhost:${Number(
				process.env?.PORT ?? 3000
			)}${apolloServer.graphqlPath}`
		);
		logger.warn(
			`🚀 Subscription endpoint ready at ws://localhost:${Number(
				process.env?.PORT ?? 3000
			)}${apolloServer.graphqlPath}`
		);
	});

	// Start server
	await broker.start();
}

main().catch(console.error);

import express from "express";
import { createServer } from "http";
import defaultsDeep from "lodash/defaultsDeep";
import { ServiceBroker, type ServiceSchema } from "moleculer";
import { resolve } from "path";

import config from "../../moleculer.config";
import apiService from "../../services/api.service";

// Create broker
const broker = new ServiceBroker(config);

// Load other services
const enableServices = ["greeter"];
const folder = __dirname.includes("dist")
	? resolve(__dirname.substring(0, __dirname.indexOf("dist")), "dist")
	: resolve(__dirname, "dist");
enableServices.forEach((serviceName) =>
	broker.loadServices(folder, `**/${serviceName}.service.js`),
);
// Load API Gateway
const svc = broker.createService(
	defaultsDeep(apiService, {
		settings: {
			server: false,
		},
	}) as ServiceSchema,
);

// Create express and HTTP server
const app = express();
const httpServer = createServer(app);

// Use ApiGateway as middleware
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
app.use("/", svc.express());

async function main() {
	// Now that our HTTP server is fully set up, actually listen.
	httpServer.listen(Number(process.env?.PORT ?? 3000));

	// Start server
	await broker.start();
}

main().catch(console.error);

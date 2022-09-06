import type { ServiceSchema } from "moleculer";
import { ServiceBroker } from "moleculer";
import SocketIOService from "moleculer-io";
import ApiService from "moleculer-web";

import config from "../../moleculer.config";

// Create broker
const broker = new ServiceBroker(config);
broker.createService({
	name: "gateway",
	mixins: [ApiService, SocketIOService as ServiceSchema], // Should after moleculer-web
	settings: {
		// Exposed port
		port: Number(process.env?.PORT ?? 3000),

		// Exposed IP
		ip: "0.0.0.0",

		cors: {
			origin: "*",
			allowedHeaders: [],
			exposedHeaders: [],
			credentials: false,
			maxAge: 3600,
		},
	},
});

// Math service
broker.createService({
	name: "math",
	actions: {
		add(ctx) {
			return Number(ctx.params.a) + Number(ctx.params.b);
		},
	},
});

broker
	.start()
	.then(() => broker.repl())
	.catch(console.error);

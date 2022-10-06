import pino from "pino";

const isProduction = process.env.NODE_ENV === "production";

export const logger = pino(
	isProduction
		? {}
		: {
				transport: {
					target: "pino-pretty",
				},
		  }
);

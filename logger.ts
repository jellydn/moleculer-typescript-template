import pino from "pino";

const isProduction = process.env.NODE_ENV === "production";

export const logger = pino(
	isProduction
		? {
				level: process.env.LEVEL ?? "warn", // Default is warn on production
		  }
		: {
				transport: {
					target: "pino-pretty",
				},
		  }
);

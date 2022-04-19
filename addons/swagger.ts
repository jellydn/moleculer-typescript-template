import { ServiceSchema } from "moleculer";
import swaggerJsdoc, { Options } from "swagger-jsdoc";

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const defaultOptions: Options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Swagger Api",
			version: "1.0",
		},
		host: `http://0.0.0.0:${Number(process.env?.PORT ?? 3000)}`,
	},
};

export const swaggerService = (
	swaggerOptions: Options = defaultOptions,
	{
		autoGenerateFile,
		swaggerFilePath,
	}: { autoGenerateFile: boolean; swaggerFilePath: string } = {
		autoGenerateFile: true,
		swaggerFilePath: resolve(__dirname, "../../public/docs/open-api.json"),
	}
): ServiceSchema => ({
	name: "$swagger",

	/**
	 * Settings
	 */
	settings: {
		autoGenerateFile,
		swaggerFilePath,
	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {
		getSwaggerSpec: {
			rest: {
				method: "GET",
				path: "/swagger.json",
			},
			handler() {
				return swaggerJsdoc(this.$swaggerOptions);
			},
		},
	},
	/**
	 * Events
	 */
	events: {},

	/**
	 * Methods
	 */
	methods: {},

	/**
	 * Service created lifecycle event handler
	 */
	created() {
		const scanFolders = [resolve(__dirname, "..")];
		this.logger.info(`Scanning folders: ${scanFolders.join(",")}`);
		const options: Options = {
			apis: scanFolders.flatMap((apiFolder) => [
				`${apiFolder}/**/*.js`,
				`${apiFolder}/**/*.ts`,
			]), // Files containing annotations as above
			...swaggerOptions,
		};
		this.$swaggerOptions = options;

		if (this.settings?.autoGenerateFile) {
			this.logger.info(
				"Generating swagger file",
				this.settings?.swaggerFilePath
			);
			const swaggerSpec = swaggerJsdoc(options);
			this.logger.info("Writing swagger file");
			writeFileSync(
				this.settings?.swaggerFilePath,
				JSON.stringify(swaggerSpec, null, 2)
			);
		}
	},

	/**
	 * Service started lifecycle event handler
	 */
	// async started() {},

	/**
	 * Service stopped lifecycle event handler
	 */
	// async stopped() {},
});

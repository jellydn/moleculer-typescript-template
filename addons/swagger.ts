// @deprecated Please use CLI command `generate:swagger` instead.
import type { ServiceSchema } from "moleculer";
import type { Options } from "swagger-jsdoc";
import swaggerJsdoc from "swagger-jsdoc";

import { type PathOrFileDescriptor, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const defaultOptions: Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Moleculer Swagger Api",
            version: "1.0",
        },
        host: `http://${process.env?.SERVER_HOSTNAME ?? "127.0.0.1"}:${Number(
            process.env?.PORT ?? 3000,
        )}`,
    },
};

export const swaggerService = (
    swaggerOptions: Options = defaultOptions,
    {
        autoGenerateFile,
        swaggerFilePath,
    }: { autoGenerateFile: boolean; swaggerFilePath?: string } = {
        autoGenerateFile: process.env.NODE_ENV !== "production",
        swaggerFilePath: resolve(__dirname, "open-api.json"),
    },
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
                return swaggerJsdoc(this.$swaggerOptions as Options);
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
        const folder = __dirname.includes("dist")
            ? resolve(__dirname.substring(0, __dirname.indexOf("dist")), "dist")
            : resolve(__dirname, "dist");
        const scanFolders = [folder];
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
            this.logger.info("Generating swagger file", this.settings?.swaggerFilePath);
            const swaggerSpec = swaggerJsdoc(options);
            this.logger.info("Writing swagger file");
            writeFileSync(
                this.settings?.swaggerFilePath as PathOrFileDescriptor,
                JSON.stringify(swaggerSpec, null, 2),
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

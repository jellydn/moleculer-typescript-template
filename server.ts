import os from "node:os";
import { config } from "dotenv";
import defaultsDeep from "lodash/defaultsDeep";
import { type BrokerOptions, type LogLevels, ServiceBroker } from "moleculer";

import moleculerConfig from "./moleculer.config";

config();

export function getMoleculerConfig(moleculerFileConfig: BrokerOptions) {
    const mergedConfig = defaultsDeep(
        moleculerFileConfig,
        ServiceBroker.defaultOptions,
    ) as unknown as BrokerOptions;

    // Override broker options from .env
    if (process.env.NAMESPACE) {
        mergedConfig.namespace = process.env.NAMESPACE;
    }

    //
    if (process.env.TRANSPORTER) {
        mergedConfig.transporter = process.env.TRANSPORTER;
    }

    if (process.env.LOGLEVEL) {
        mergedConfig.logLevel = process.env.LOGLEVEL as unknown as LogLevels;
    }

    // NOTE: Support more .env variables here if needed

    if (!mergedConfig.nodeID) {
        const nodeId = `${os.hostname().toLowerCase()}-${process.pid}`;
        mergedConfig.nodeID = nodeId;
    }

    return mergedConfig;
}

// Create a ServiceBroker
const broker = new ServiceBroker(getMoleculerConfig(moleculerConfig));
broker.logger.info("Booting Moleculer server...");
// Start the broker
broker
    .start()
    .then(() => {
        broker.logger.info("Moleculer server started.");

        // Load services from "services" folder
        broker.logger.info("Loading services...");
        broker.loadServices("./services", "**/*.service.ts");
    })
    .catch((err) => {
        broker.logger.error(err);
    });

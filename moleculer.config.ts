import type { BrokerOptions } from "moleculer";

import { stdTimeFunctions } from "pino";

/**
 * Moleculer ServiceBroker configuration file
 *
 * More info about options:
 *     https://moleculer.services/docs/0.14/configuration.html
 *
 *
 * Overwriting options in production:
 * ================================
 * 	You can overwrite any option with environment variables.
 * 	For example to overwrite the "logLevel" value, use `LOGLEVEL=warn` env var.
 * 	To overwrite a nested parameter, e.g. retryPolicy.retries, use `RETRYPOLICY_RETRIES=10` env var.
 *
 * 	To overwrite broker’s deeply nested default options, which are not presented in "moleculer.config.js",
 * 	use the `MOL_` prefix and double underscore `__` for nested properties in .env file.
 * 	For example, to set the cacher prefix to `MYCACHE`, you should declare an env var as `MOL_CACHER__OPTIONS__PREFIX=mycache`.
 *  It will set this:
 *  {
 *    cacher: {
 *      options: {
 *        prefix: "mycache"
 *      }
 *    }
 *  }
 */
const config: BrokerOptions = {
    // Namespace of nodes to segment your nodes on the same network.
    namespace: "api",
    // Unique node identifier. Must be unique in a namespace.
    nodeID: `api-${Math.random().toString(36).slice(2, 15)}${Math.random()
        .toString(36)
        .slice(2, 15)}`,
    // Custom metadata store. Store here what you want. Accessing: `this.broker.metadata`
    metadata: {},

    // Enable/disable logging or use custom logger. More info: https://moleculer.services/docs/0.14/logging.html
    // Available logger types: "Console", "File", "Pino", "Winston", "Bunyan", "debug", "Log4js", "Datadog"
    logger: [
        {
            // Note: Change to Console if you want to see the logger output
            type: "Pino",
            options: {
                pino: {
                    // More info: http://getpino.io/#/docs/api?id=options-object
                    options: {
                        timestamp: stdTimeFunctions.isoTime,
                    },
                },
            },
        },
        {
            type: "Console",
        },
    ],

    // Define transporter.
    // More info: https://moleculer.services/docs/0.14/networking.html
    // Note: During the development, you don't need to define it because all services will be loaded locally.
    // In production you can set it via `TRANSPORTER=nats://localhost:4222` environment variable.
    transporter: "NATS", // "NATS"

    // Define a cacher.
    // More info: https://moleculer.services/docs/0.14/caching.html
    // cacher: null,

    // Define a serializer.
    // Available values: "JSON", "Avro", "ProtoBuf", "MsgPack", "Notepack", "Thrift".
    // More info: https://moleculer.services/docs/0.14/networking.html#Serialization
    serializer: "JSON",

    // Number of milliseconds to wait before reject a request with a RequestTimeout error. Disabled: 0
    requestTimeout: 10 * 1000,

    // Retry policy settings. More info: https://moleculer.services/docs/0.14/fault-tolerance.html#Retry
    retryPolicy: {
        // Enable feature
        enabled: false,
        // Count of retries
        retries: 5,
        // First delay in milliseconds.
        delay: 100,
        // Maximum delay in milliseconds.
        maxDelay: 1000,
        // Backoff factor for delay. 2 means exponential backoff.
        factor: 2,
        // A function to check failed requests.
        check: (error: Error & { retryable?: boolean }) => error && Boolean(error.retryable),
    },

    // Limit of calling level. If it reaches the limit, broker will throw an MaxCallLevelError error. (Infinite loop protection)
    maxCallLevel: 100,

    // Number of seconds to send heartbeat packet to other nodes.
    heartbeatInterval: 10,
    // Number of seconds to wait before setting node to unavailable status.
    heartbeatTimeout: 30,

    // Cloning the params of context if enabled. High performance impact, use it with caution!
    contextParamsCloning: false,

    // Tracking requests and waiting for running requests before shutting down. More info: https://moleculer.services/docs/0.14/context.html#Context-tracking
    tracking: {
        // Enable feature
        enabled: false,
        // Number of milliseconds to wait before shooting down the process.
        shutdownTimeout: 5000,
    },

    // Disable built-in request & emit balancer. (Transporter must support it, as well.). More info: https://moleculer.services/docs/0.14/networking.html#Disabled-balancer
    disableBalancer: false,

    // Settings of Service Registry. More info: https://moleculer.services/docs/0.14/registry.html
    registry: {
        // Define balancing strategy. More info: https://moleculer.services/docs/0.14/balancing.html
        // Available values: "RoundRobin", "Random", "CpuUsage", "Latency", "Shard"
        strategy: "RoundRobin",
        // Enable local action call preferring. Always call the local action instance if available.
        preferLocal: true,
    },

    // Settings of Circuit Breaker. More info: https://moleculer.services/docs/0.14/fault-tolerance.html#Circuit-Breaker
    circuitBreaker: {
        // Enable feature
        enabled: false,
        // Threshold value. 0.5 means that 50% should be failed for tripping.
        threshold: 0.5,
        // Minimum request count. Below it, CB does not trip.
        minRequestCount: 20,
        // Number of seconds for time window.
        windowTime: 60,
        // Number of milliseconds to switch from open to half-open state
        halfOpenTime: 10 * 1000,
        // A function to check failed requests.
        // @ts-expect-error Property 'code' does not exist on type 'Error'.ts(2339)
        check: (error) => error && error.code >= 500,
    },

    // Settings of bulkhead feature. More info: https://moleculer.services/docs/0.14/fault-tolerance.html#Bulkhead
    bulkhead: {
        // Enable feature.
        enabled: false,
        // Maximum concurrent executions.
        concurrency: 10,
        // Maximum size of queue
        maxQueueSize: 100,
    },

    // Enable action & event parameter validation. More info: https://moleculer.services/docs/0.14/validating.html
    validator: true,

    // ErrorHandler: null,

    // Enable/disable built-in metrics function. More info: https://moleculer.services/docs/0.14/metrics.html
    metrics: {
        enabled: false,
        // Available built-in reporters: "Console", "CSV", "Event", "Prometheus", "Datadog", "StatsD"
        reporter: {
            type: "Console",
            options: {
                // Custom logger
                logger: null,
                // Using colors
                colors: true,
                // Width of row
                width: 100,
                // Gauge width in the row
                gaugeWidth: 40,
            },
        },
    },

    // Enable built-in tracing function. More info: https://moleculer.services/docs/0.14/tracing.html
    tracing: {
        enabled: true,
        // Available built-in exporters: "Console", "Datadog", "Event", "EventLegacy", "Jaeger", "Zipkin"
        exporter: [
            {
                type: "Event",
                options: {
                    // Name of event
                    eventName: "$tracing.spans",
                    // Send event when a span started
                    sendStartSpan: false,
                    // Send event when a span finished
                    sendFinishSpan: true,
                    // Broadcast or emit event
                    broadcast: false,
                    // Event groups
                    groups: null,
                    // Sending time interval in seconds
                    interval: 5,
                    // Custom span object converter before sending
                    spanConverter: null,
                    // Default tags. They will be added into all span tags.
                    defaultTags: null,
                },
            },
        ],
    },

    // Register custom middlewares
    middlewares: [],

    // Register custom REPL commands.
    // replCommands: null,

    // Called after broker created.
    created(broker) {
        broker.logger.warn("[%s] Broker created!", broker.namespace);
    },

    // Called after broker started.
    async started(broker) {
        broker.logger.warn("[%s] Broker started!", broker.namespace);
    },

    // Called after broker stopped.
    async stopped(broker) {
        broker.logger.warn("[%s] Broker stopped!", broker.namespace);
    },
};

export default config;

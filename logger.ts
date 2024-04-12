import pino, { stdTimeFunctions } from "pino";

// Usage: logger[logLevel]([mergingObject],[message])
export const logger = pino({
    level: process.env.LOGLEVEL ?? "info",
    timestamp: stdTimeFunctions.isoTime,
});

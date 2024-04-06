// Usage: npx tsx client.ts | npx pino-pretty
import { MoleculerApi } from "../../generated/sdk";
import { logger } from "../../logger";

const apiClient = new MoleculerApi({
    BASE: "http://localhost:4567",
});

logger.level = "debug";

async function main() {
    logger.debug("Client started");
    try {
        const hello = await apiClient.default.getApiGreeterHello();
        console.log("Hello", hello);
        logger.info("hello", hello);

        const welcome = await apiClient.default.getApiGreeterWelcome({ username: "IT Man" });
        logger.info(welcome);
    } catch (err) {
        console.error("Error:", err);
    }
}

main()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));

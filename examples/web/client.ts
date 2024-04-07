// Usage: npx tsx client.ts | npx pino-pretty
import { MoleculerApi } from "../../generated/sdk";
import { logger } from "../../logger";

// API client with fetch
const apiClient = new MoleculerApi({
    BASE: "http://localhost:4567",
});

logger.level = "debug";

async function main() {
    logger.debug("Client started");
    try {
        const hello = await apiClient.greeter.getApiGreeterHello();
        logger.info("%s", hello);

        const welcome = await apiClient.greeter.getApiGreeterWelcome({ username: "IT Man" });
        logger.info(welcome);

        const item = await apiClient.product.postApiProductCart({
            requestBody: {
                name: "Iphone",
                qty: 1,
            },
        });
        logger.info(item);
    } catch (err) {
        logger.error(err);
    }
}

main()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));

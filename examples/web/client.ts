// Usage: npx tsx client.ts | npx pino-pretty
import { getApiGreeterHello, getApiGreeterWelcome, postApiProductCart } from "../../generated/sdk";
import { client } from "../../generated/sdk/client.gen";
import { logger } from "../../logger";

// Configure API client with fetch
client.setConfig({
    baseUrl: "http://localhost:3000",
});

logger.level = "debug";

async function main() {
    logger.debug("Client started");
    try {
        const hello = await getApiGreeterHello();
        logger.info("%s", hello);

        const welcome = await getApiGreeterWelcome({
            query: { username: "IT Man" },
        });
        logger.info(welcome);

        const item = await postApiProductCart({
            body: {
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
    .catch((error) => {
        logger.error(error);
        process.exit(1);
    });

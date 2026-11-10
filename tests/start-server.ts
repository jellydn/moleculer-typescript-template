import { server } from "./mocks/server";

// Install mocks before loading services; production startup does not import tests.
server.listen({ onUnhandledRequest: "error" });
import("../server").catch((error) => {
    console.error(error);
    process.exit(1);
});

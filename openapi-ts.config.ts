import { defineConfig } from "@hey-api/openapi-ts";

// Refer to https://heyapi.dev/openapi-ts/configuration.html
export default defineConfig({
    input: "public/docs/open-api.json",
    output: "generated/sdk",
    name: "MoleculerApi",
    useOptions: true,
    plugins: ["@hey-api/client-fetch"],
    exportCore: true,
});

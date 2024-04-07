import { defineConfig } from "@hey-api/openapi-ts";

// Refer to https://heyapi.vercel.app/openapi-ts/migrating.html#openapi-typescript-codegen
export default defineConfig({
    input: "public/docs/open-api.json",
    output: "generated/sdk",
    name: "MoleculerApi",
    useOptions: true,
    enums: "javascript",
    client: "fetch",
    format: false,
});

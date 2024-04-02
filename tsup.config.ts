import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["addons/**/*.ts", "logger.ts", "moleculer.config.ts", "services/**/*.ts"],
    splitting: false,
    sourcemap: true,
    format: ["esm", "cjs"],
    target: "es2022",
    clean: true,
    outExtension({ format }) {
        if (format.toLowerCase() === "esm") {
            return { js: ".mjs" };
        }

        return {
            js: ".js",
        };
    },
});

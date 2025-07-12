/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
    test: {
        globals: false,
        environment: "node",
        include: ["test/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        exclude: ["node_modules", "dist", ".git", "coverage", "generated"],
        coverage: {
            provider: "v8",
            exclude: [
                "node_modules",
                "dist",
                "coverage",
                "generated",
                "**/*.{config,test,spec}.{js,ts}",
                "**/*.d.ts",
            ],
            reporter: ["text", "json", "html"],
        },
    },
});

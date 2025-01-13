import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        // Support jest globals
        globals: true,
        exclude: [
            "**/node_modules/**",
            "**/dist/**",
            "**/tests/**",
            "**/.{idea,git,cache,output,temp}/**",
        ],
    },
});

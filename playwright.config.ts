import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "./tests",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: "html",
    use: {
        baseURL: "http://127.0.0.1:18889",
        trace: "on-first-retry",
    },

    // These tests exercise HTTP APIs, not browser engines.
    projects: [{ name: "api" }],

    webServer: {
        command: "node --import tsx tests/start-server.ts",
        url: "http://127.0.0.1:18889/api/weather?latitude=46.9481&longitude=7.4474",
        env: { NODE_ENV: "test", PORT: "18889", TRANSPORTER: "TCP" },
        reuseExistingServer: false,
    },
});

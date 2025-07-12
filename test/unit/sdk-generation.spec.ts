import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";

describe("SDK Generation", () => {
    const sdkPath = join(process.cwd(), "generated", "sdk");
    const expectedFiles = ["index.ts", "types.gen.ts", "sdk.gen.ts", "client.gen.ts"];

    // Detect package manager
    const packageManager = existsSync("pnpm-lock.yaml") ? "pnpm" : "bun";
    const generateCmd = packageManager === "pnpm" ? "pnpm generate:sdk" : "bun run generate:sdk";
    const typecheckCmd = packageManager === "pnpm" ? "pnpm typecheck" : "bun run typecheck";

    beforeAll(() => {
        // Ensure SDK is generated before tests
        try {
            execSync(generateCmd, { stdio: "inherit" });
        } catch (_error) {
            // Fallback to direct openapi-ts command
            execSync("npx openapi-ts", { stdio: "inherit" });
        }
    });

    it("should generate SDK successfully", () => {
        expect(() => {
            try {
                execSync(generateCmd, { stdio: "pipe" });
            } catch (_error) {
                // Fallback to direct command
                execSync("npx openapi-ts", { stdio: "pipe" });
            }
        }).not.toThrow();
    });

    it("should create all expected SDK files", () => {
        for (const file of expectedFiles) {
            const filePath = join(sdkPath, file);
            expect(existsSync(filePath), `${file} should exist`).toBe(true);
        }
    });

    it("should generate valid TypeScript files", () => {
        for (const file of expectedFiles) {
            const filePath = join(sdkPath, file);
            const content = readFileSync(filePath, "utf-8");

            // Basic checks for valid TypeScript
            expect(content.length).toBeGreaterThan(0);
            expect(content).toContain("// This file is auto-generated");
        }
    });

    it("should export expected API functions", () => {
        const sdkContent = readFileSync(join(sdkPath, "sdk.gen.ts"), "utf-8");

        // Check for expected API endpoints
        expect(sdkContent).toContain("getApiGreeterHello");
        expect(sdkContent).toContain("getApiGreeterWelcome");
        expect(sdkContent).toContain("postApiProductCart");
    });

    it("should generate types for our DTOs", () => {
        const typesContent = readFileSync(join(sdkPath, "types.gen.ts"), "utf-8");

        // Check for expected types based on our services
        expect(typesContent).toContain("GetApiGreeterHelloResponse");
        expect(typesContent).toContain("GetApiGreeterWelcomeResponse");
        expect(typesContent).toContain("PostApiProductCartResponse");
    });

    it("should TypeScript compile the generated SDK", () => {
        expect(() => {
            try {
                execSync(typecheckCmd, { stdio: "pipe" });
            } catch (_error) {
                // Fallback to direct tsc command
                execSync("npx tsc -b", { stdio: "pipe" });
            }
        }).not.toThrow();
    });
});

import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import yaml from "yaml";
import "../../services/dtos/product.dto";

describe("SDK Generation", () => {
    const sdkPath = join(process.cwd(), "generated", "sdk");
    const expectedFiles = ["index.ts", "types.gen.ts", "sdk.gen.ts", "client.gen.ts"];

    beforeAll(() => {
        // Ensure SDK is generated before tests
        execSync("npm run generate:sdk", { stdio: "inherit" });
    });

    it("should generate SDK successfully", () => {
        expect(() => {
            execSync("npm run generate:sdk", { stdio: "pipe" });
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

    it("should retain the cart components referenced by the API documentation", () => {
        const document = yaml.parse(
            readFileSync("services/dtos/product-dto.swagger.yaml", "utf-8"),
        );
        expect(document.components.schemas.addCartDTO.required).toEqual(["name", "qty"]);
        expect(document.components.schemas.addCartDTO.properties.billing.required).toEqual([
            "city",
            "zip",
            "country",
        ]);
        expect(document.components.schemas.addCartResponseDTO.required).toEqual([
            "success",
            "message",
        ]);
    });

    it("should TypeScript compile the generated SDK", () => {
        expect(() => {
            execSync("npm run typecheck", { stdio: "pipe" });
        }).not.toThrow();
    });
});

import { type APIRequestContext, expect, test } from "@playwright/test";

// Test group for health check endpoint
test.describe("Health Check API", () => {
    test("should return success response with CPU info", async ({
        request,
    }: { request: APIRequestContext }) => {
        const response = await request.get("/api/health/check");
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        const body = await response.json();

        // CPU checks
        expect(body.cpu).toBeDefined();
        expect(typeof body.cpu.load1).toBe("number");
        expect(typeof body.cpu.load5).toBe("number");
        expect(typeof body.cpu.load15).toBe("number");
        expect(body.cpu.cores).toBeGreaterThan(0);
        expect(body.cpu.utilization).toBeGreaterThanOrEqual(0);
    });

    test("should include memory information", async ({
        request,
    }: { request: APIRequestContext }) => {
        const response = await request.get("/api/health/check");
        const body = await response.json();

        expect(body.mem).toBeDefined();
        expect(body.mem.free).toBeGreaterThan(0);
        expect(body.mem.total).toBeGreaterThan(0);
        expect(body.mem.percent).toBeGreaterThanOrEqual(0);
        expect(body.mem.percent).toBeLessThanOrEqual(100);
    });

    test("should include detailed OS information", async ({
        request,
    }: { request: APIRequestContext }) => {
        const response = await request.get("/api/health/check");
        const body = await response.json();

        expect(body.os).toBeDefined();
        expect(body.os.uptime).toBeGreaterThan(0);
        expect(body.os.type).toBe("Darwin");
        expect(body.os.release).toBeDefined();
        expect(body.os.hostname).toBeDefined();
        expect(body.os.arch).toBe("arm64");
        expect(body.os.platform).toBe("darwin");

        // OS User info
        expect(body.os.user).toBeDefined();
        expect(body.os.user.uid).toBeGreaterThan(0);
        expect(body.os.user.gid).toBeGreaterThan(0);
        expect(body.os.user.username).toBeDefined();
        expect(body.os.user.homedir).toMatch(/^\/Users\//);
        expect(body.os.user.shell).toBeDefined();
    });

    test("should include detailed process information", async ({
        request,
    }: { request: APIRequestContext }) => {
        const response = await request.get("/api/health/check");
        const body = await response.json();

        expect(body.process).toBeDefined();
        expect(body.process.pid).toBeGreaterThan(0);
        expect(body.process.uptime).toBeGreaterThan(0);

        // Process memory
        expect(body.process.memory).toBeDefined();
        expect(body.process.memory.rss).toBeGreaterThan(0);
        expect(body.process.memory.heapTotal).toBeGreaterThan(0);
        expect(body.process.memory.heapUsed).toBeGreaterThan(0);
        expect(body.process.memory.external).toBeGreaterThanOrEqual(0);
        expect(body.process.memory.arrayBuffers).toBeGreaterThanOrEqual(0);

        // Process argv
        expect(body.process.argv).toBeInstanceOf(Array);
        expect(body.process.argv.length).toBeGreaterThan(0);
    });

    test("should include client information", async ({
        request,
    }: { request: APIRequestContext }) => {
        const response = await request.get("/api/health/check");
        const body = await response.json();

        expect(body.client).toBeDefined();
        expect(body.client.type).toBe("nodejs");
        expect(body.client.version).toBeDefined();
        expect(body.client.langVersion).toMatch(/^v\d+\.\d+\.\d+$/);
    });

    test("should include network information", async ({
        request,
    }: { request: APIRequestContext }) => {
        const response = await request.get("/api/health/check");
        const body = await response.json();

        expect(body.net).toBeDefined();
        expect(body.net.ip).toBeInstanceOf(Array);
        expect(body.net.ip.length).toBeGreaterThan(0);
        // Check if IPs are valid
        body.net.ip.forEach((ip: string) => {
            expect(ip).toMatch(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/);
        });
    });

    test("should include properly formatted time information", async ({
        request,
    }: { request: APIRequestContext }) => {
        const response = await request.get("/api/health/check");
        const body = await response.json();
        expect(body.time).toBeDefined();
        expect(typeof body.time.now).toBe("number");
        expect(body.time.iso).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
        expect(body.time.utc).toMatch(
            /^[A-Za-z]{3}, \d{2} [A-Za-z]{3} \d{4} \d{2}:\d{2}:\d{2} GMT$/,
        );

        // Verify time consistency
        const now = new Date(body.time.now);
        const iso = new Date(body.time.iso);
        const utc = new Date(body.time.utc);

        expect(Math.abs(now.getTime() - iso.getTime())).toBeLessThan(1000);
        expect(Math.abs(now.getTime() - utc.getTime())).toBeLessThan(1000);
    });

    test("should respond within acceptable time limit", async ({
        request,
    }: { request: APIRequestContext }) => {
        const startTime = Date.now();
        await request.get("/api/health/check");
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        expect(responseTime).toBeLessThan(1000); // Response should be under 1 second
    });
});

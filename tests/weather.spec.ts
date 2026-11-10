import { expect, test } from "@playwright/test";
import { mockWeatherData } from "./mocks/fixtures";

test.describe("Weather API", () => {
    test("should fetch weather data successfully", async ({ request }) => {
        const response = await request.get("/api/weather?latitude=46.9481&longitude=7.4474");
        expect(response.ok()).toBeTruthy();

        const data = await response.json();
        expect(data).toEqual({ ...mockWeatherData, latitude: 46.9481, longitude: 7.4474 });
    });

    test("should validate required parameters", async ({ request }) => {
        const response = await request.get("/api/weather");
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(422);
    });

    for (const [latitude, longitude] of [
        [52.52, 13.41],
        [1.5, -33.87],
        [-90, -180],
        [90, 180],
    ]) {
        test(`should accept coordinates ${latitude}, ${longitude}`, async ({ request }) => {
            const response = await request.get(
                `/api/weather?latitude=${latitude}&longitude=${longitude}`,
            );
            expect(response.status()).toBe(200);
            expect(await response.json()).toEqual({ ...mockWeatherData, latitude, longitude });
        });
    }

    for (const [latitude, longitude] of [
        [90.01, 0],
        [-90.01, 0],
        [0, 180.01],
        [0, -180.01],
        ["invalid", 0],
        ["", 1],
        [1, ""],
        ["%20%20", 1],
        [1, "%20%20"],
    ]) {
        test(`should reject coordinates ${latitude}, ${longitude}`, async ({ request }) => {
            const response = await request.get(
                `/api/weather?latitude=${latitude}&longitude=${longitude}`,
            );
            expect(response.status()).toBe(422);
            expect((await response.json()).type).toBe("VALIDATION_ERROR");
        });
    }

    test("should preserve the upstream status without reporting an internal error", async ({
        request,
    }) => {
        const response = await request.get("/api/weather?latitude=11.1111&longitude=22.2222");
        expect(response.status()).toBe(502);
        expect(await response.json()).toMatchObject({
            message: "Weather API error: HTTP 503",
            type: "WEATHER_UPSTREAM_ERROR",
            data: { status: 503 },
        });
    });

    for (const coordinate of [10, 12]) {
        test(`should map network or JSON failures at ${coordinate} to 502`, async ({ request }) => {
            const response = await request.get(
                `/api/weather?latitude=${coordinate}&longitude=${coordinate}`,
            );
            expect(response.status()).toBe(502);
            expect(await response.json()).toMatchObject({
                type: "WEATHER_UPSTREAM_ERROR",
                message: "Weather upstream request failed",
            });
        });
    }
});

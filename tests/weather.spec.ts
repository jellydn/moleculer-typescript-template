import { expect, test } from "@playwright/test";

test.describe("Weather API", () => {
    const mockWeatherData = {
        latitude: 46.94,
        longitude: 7.44,
        current: {
            temperature_2m: 20.5,
            relative_humidity_2m: 65,
            rain: 0,
            weather_code: 1,
        },
    };

    test("should fetch weather data successfully", async ({ request }) => {
        const response = await request.get("/api/weather?latitude=46.9481&longitude=7.4474");
        expect(response.ok()).toBeTruthy();

        const data = await response.json();
        expect(data).toEqual(mockWeatherData);
    });

    test("should validate required parameters", async ({ request }) => {
        const response = await request.get("/api/weather");
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(422);
    });

    test("should reject coordinates outside the valid range", async ({ request }) => {
        const response = await request.get("/api/weather?latitude=91&longitude=7.4474");
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(422);
    });

    test("should report an upstream failure as a bad gateway", async ({ request }) => {
        const response = await request.get("/api/weather?latitude=11.1111&longitude=22.2222");
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(502);
    });
});

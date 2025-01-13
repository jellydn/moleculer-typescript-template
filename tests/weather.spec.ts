import { expect, test } from "@playwright/test";
import { server } from "./mocks/server";

// Establish API mocking before all tests.
test.beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
test.afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
test.afterAll(() => server.close());

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
});

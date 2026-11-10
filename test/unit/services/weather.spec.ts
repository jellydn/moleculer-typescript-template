import { Errors, ServiceBroker, type ServiceSchema } from "moleculer";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import TestService, {
    type GetWeatherParams,
    type WeatherData,
} from "../../../services/weather.service";
import { server } from "../../../tests/mocks/server";

const { ValidationError } = Errors;

describe("Test 'weather' service", () => {
    const broker = new ServiceBroker({ logger: false });
    broker.createService(TestService as unknown as ServiceSchema);

    beforeAll(async () => {
        server.listen({ onUnhandledRequest: "error" });
        await broker.start();
    });
    afterEach(() => server.resetHandlers());
    afterAll(async () => {
        await broker.stop();
        server.close();
    });

    describe("Test 'weather.getCurrentWeather' action", () => {
        it("should return weather data for valid coordinates", async () => {
            const response = await broker.call<WeatherData, GetWeatherParams>(
                "weather.getCurrentWeather",
                {
                    latitude: "46.9481",
                    longitude: "7.4474",
                },
            );
            expect(response.current).toEqual({
                temperature_2m: 20.5,
                relative_humidity_2m: 65,
                rain: 0,
                weather_code: 1,
            });
        });

        it("should report an upstream failure", async () => {
            await expect(
                broker.call("weather.getCurrentWeather", {
                    latitude: "11.1111",
                    longitude: "22.2222",
                }),
            ).rejects.toThrow("Weather API error:");
        });

        it("should reject with ValidationError when params are missing", async () => {
            expect.assertions(1);
            try {
                await broker.call("weather.getCurrentWeather");
            } catch (error: unknown) {
                expect(error).toBeInstanceOf(ValidationError);
            }
        });
    });
});

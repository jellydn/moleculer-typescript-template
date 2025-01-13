import { Errors, ServiceBroker, type ServiceSchema } from "moleculer";
import TestService, {
    type GetWeatherParams,
    type WeatherData,
} from "../../../services/weather.service";
import "../../../tests/mocks/server";

const { ValidationError } = Errors;

describe("Test 'weather' service", () => {
    const broker = new ServiceBroker({ logger: false });
    broker.createService(TestService as unknown as ServiceSchema);

    beforeAll(async () => broker.start());
    afterAll(async () => broker.stop());

    describe("Test 'weather.getCurrentWeather' action", () => {
        it("should return weather data for valid coordinates", async () => {
            const response = await broker.call<WeatherData, GetWeatherParams>(
                "weather.getCurrentWeather",
                {
                    latitude: "46.9481",
                    longitude: "7.4474",
                },
            );
            expect(response.current).toBeDefined();
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

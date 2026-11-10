import type { WeatherData } from "../../services/weather.service";

/**
 * A recorded Open-Meteo forecast response for the fields the weather endpoint
 * requests. The live API returns snapped grid coordinates. The query-sensitive
 * handler replaces them with the requested pair to test query forwarding;
 * direct fixture responses retain the recorded grid coordinates.
 *
 * https://api.open-meteo.com/v1/forecast?latitude=46.9481&longitude=7.4474&current=temperature_2m,relative_humidity_2m,rain,weather_code
 */
export const mockWeatherData: WeatherData = {
    latitude: 46.951378,
    longitude: 7.4586725,
    generationtime_ms: 0.09,
    utc_offset_seconds: 0,
    timezone: "GMT",
    timezone_abbreviation: "GMT",
    elevation: 554.0,
    current_units: {
        time: "iso8601",
        interval: "seconds",
        temperature_2m: "°C",
        relative_humidity_2m: "%",
        rain: "mm",
        weather_code: "wmo code",
    },
    current: {
        time: "2026-11-10T13:45",
        interval: 900,
        temperature_2m: 11.9,
        relative_humidity_2m: 89,
        rain: 0.0,
        weather_code: 3,
    },
};

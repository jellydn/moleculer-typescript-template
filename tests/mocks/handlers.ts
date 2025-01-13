import { http, HttpResponse } from "msw";

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

export const handlers = [
    // Mock weather API
    http.get("**/api.open-meteo.com/v1/forecast", ({ request }) => {
        const url = new URL(request.url);
        const latitude = url.searchParams.get("latitude");
        const longitude = url.searchParams.get("longitude");

        if (latitude === "46.9481" && longitude === "7.4474") {
            return HttpResponse.json(mockWeatherData);
        }

        return new HttpResponse("Invalid coordinates", { status: 422 });
    }),
];

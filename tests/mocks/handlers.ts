import { HttpResponse, http } from "msw";

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

        if (latitude === "11.1111" && longitude === "22.2222") {
            return new HttpResponse(null, { status: 503 });
        }

        if (latitude === "10" && longitude === "10") return HttpResponse.error();
        if (latitude === "12" && longitude === "12") return HttpResponse.text("not JSON");
        if (
            url.searchParams.get("current") !==
            "temperature_2m,relative_humidity_2m,rain,weather_code"
        ) {
            return new HttpResponse(null, { status: 400 });
        }

        return HttpResponse.json({
            ...mockWeatherData,
            latitude: Number(latitude),
            longitude: Number(longitude),
        });
    }),
];

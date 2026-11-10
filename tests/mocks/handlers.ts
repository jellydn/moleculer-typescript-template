import { HttpResponse, http } from "msw";

import { mockWeatherData } from "./fixtures";

/**
 * The upstream is modelled as unavailable for this coordinate pair so the
 * gateway's 502 mapping can be exercised end to end.
 */
const unavailableCoordinates = { latitude: "11.1111", longitude: "22.2222" };

export const handlers = [
    // Mock weather API
    http.get("**/api.open-meteo.com/v1/forecast", ({ request }) => {
        const url = new URL(request.url);
        const latitude = url.searchParams.get("latitude");
        const longitude = url.searchParams.get("longitude");

        if (
            latitude === unavailableCoordinates.latitude &&
            longitude === unavailableCoordinates.longitude
        ) {
            return HttpResponse.json(
                { error: true, reason: "Service unavailable" },
                { status: 503 },
            );
        }

        return HttpResponse.json(mockWeatherData);
    }),
];

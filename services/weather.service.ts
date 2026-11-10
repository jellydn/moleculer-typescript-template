import { type Context, Errors, type Service, type ServiceSchema } from "moleculer";
import { z } from "zod";

const coordinateSchema = z.union([z.number(), z.string().trim().min(1).pipe(z.coerce.number())]);
const weatherParamsSchema = z.object({
    latitude: coordinateSchema.pipe(z.number().min(-90).max(90)),
    longitude: coordinateSchema.pipe(z.number().min(-180).max(180)),
});

export type WeatherData = {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_units: {
        time: string;
        interval: string;
        temperature_2m: string;
        relative_humidity_2m: string;
        rain: string;
        weather_code: string;
    };
    current: {
        time: string;
        interval: number;
        temperature_2m: number;
        relative_humidity_2m: number;
        rain: number;
        weather_code: number;
    };
};

export type GetWeatherParams = {
    latitude: number;
    longitude: number;
};

type ServiceSettings = {
    weatherApiUrl: string;
};

type ServiceMethods = {
    fetchWeatherData(params: GetWeatherParams): Promise<WeatherData>;
};

type ServiceThis = Service<ServiceSettings> & ServiceMethods;

const weatherService: ServiceSchema<ServiceSettings, ServiceThis> = {
    name: "weather",

    settings: {
        weatherApiUrl: "https://api.open-meteo.com/v1/forecast",
    },

    dependencies: [],

    actions: {
        /**
         * @swagger
         * /api/weather:
         *   get:
         *     description: Returns current weather from Open-Meteo for the supplied coordinates.
         *     tags: [weather]
         *     parameters:
         *       - name: latitude
         *         in: query
         *         required: true
         *         schema:
         *           type: number
         *           minimum: -90
         *           maximum: 90
         *       - name: longitude
         *         in: query
         *         required: true
         *         schema:
         *           type: number
         *           minimum: -180
         *           maximum: 180
         *     responses:
         *       200:
         *         description: Upstream weather payload including current measurements.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               required: [current]
         *               properties:
         *                 current:
         *                   type: object
         *                   required: [temperature_2m, relative_humidity_2m, rain, weather_code]
         *                   properties:
         *                     temperature_2m:
         *                       type: number
         *                     relative_humidity_2m:
         *                       type: number
         *                     rain:
         *                       type: number
         *                     weather_code:
         *                       type: number
         *       422:
         *         description: Missing, blank, non-numeric or out-of-range coordinate.
         *       502:
         *         description: Upstream HTTP, network, timeout or JSON failure.
         */
        getCurrentWeather: {
            rest: "GET /",
            hooks: {
                before(ctx: Context<GetWeatherParams>) {
                    const result = weatherParamsSchema.safeParse(ctx.params);
                    if (!result.success) {
                        throw new Errors.ValidationError(
                            "Parameters validation error!",
                            "VALIDATION_ERROR",
                            result.error.issues,
                        );
                    }
                    ctx.params = result.data;
                },
            },
            async handler(this: ServiceThis, ctx: Context<GetWeatherParams>): Promise<WeatherData> {
                return this.fetchWeatherData(ctx.params);
            },
        },
    },

    events: {},

    methods: {
        async fetchWeatherData(params: GetWeatherParams): Promise<WeatherData> {
            const queryParams = new URLSearchParams({
                latitude: params.latitude.toString(),
                longitude: params.longitude.toString(),
                current: "temperature_2m,relative_humidity_2m,rain,weather_code",
            });
            try {
                const response = await fetch(`${this.settings.weatherApiUrl}?${queryParams}`, {
                    signal: AbortSignal.timeout(5000),
                });
                if (!response.ok) {
                    throw new Errors.MoleculerError(
                        `Weather API error: HTTP ${response.status}`,
                        502,
                        "WEATHER_UPSTREAM_ERROR",
                        { status: response.status },
                    );
                }
                return await response.json();
            } catch (error) {
                if (error instanceof Errors.MoleculerError) throw error;
                throw new Errors.MoleculerError(
                    "Weather upstream request failed",
                    502,
                    "WEATHER_UPSTREAM_ERROR",
                );
            }
        },
    },

    created() {
        this.logger.info(`The ${this.name} service created.`);
    },

    async started() {
        this.logger.info(`The ${this.name} service started.`);
    },

    async stopped() {
        this.logger.info(`The ${this.name} service stopped.`);
    },
};

export default weatherService;

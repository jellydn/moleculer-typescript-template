import { type Context, Errors, type Service, type ServiceSchema } from "moleculer";
import { z } from "zod";

const coordinateSchema = z.union([z.number(), z.string().trim().min(1).pipe(z.coerce.number())]);
const weatherParamsSchema = z.object({
    latitude: coordinateSchema.pipe(z.number().min(-90).max(90)),
    longitude: coordinateSchema.pipe(z.number().min(-180).max(180)),
});

const weatherDataSchema = z.looseObject({
    latitude: z.number(),
    longitude: z.number(),
    generationtime_ms: z.number(),
    utc_offset_seconds: z.number(),
    timezone: z.string(),
    timezone_abbreviation: z.string(),
    elevation: z.number(),
    current_units: z.looseObject({
        time: z.string(),
        interval: z.string(),
        temperature_2m: z.string(),
        relative_humidity_2m: z.string(),
        rain: z.string(),
        weather_code: z.string(),
    }),
    current: z.looseObject({
        time: z.string(),
        interval: z.number(),
        temperature_2m: z.number().nullable(),
        relative_humidity_2m: z.number().nullable(),
        rain: z.number().nullable(),
        weather_code: z.number().nullable(),
    }),
});

export type WeatherData = z.infer<typeof weatherDataSchema>;

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
         *               required: [latitude, longitude, generationtime_ms, utc_offset_seconds, timezone, timezone_abbreviation, elevation, current_units, current]
         *               properties:
         *                 latitude:
         *                   type: number
         *                 longitude:
         *                   type: number
         *                 generationtime_ms:
         *                   type: number
         *                 utc_offset_seconds:
         *                   type: number
         *                 timezone:
         *                   type: string
         *                 timezone_abbreviation:
         *                   type: string
         *                 elevation:
         *                   type: number
         *                 current_units:
         *                   type: object
         *                   required: [time, interval, temperature_2m, relative_humidity_2m, rain, weather_code]
         *                   properties:
         *                     time:
         *                       type: string
         *                     interval:
         *                       type: string
         *                     temperature_2m:
         *                       type: string
         *                     relative_humidity_2m:
         *                       type: string
         *                     rain:
         *                       type: string
         *                     weather_code:
         *                       type: string
         *                 current:
         *                   type: object
         *                   required: [time, interval, temperature_2m, relative_humidity_2m, rain, weather_code]
         *                   properties:
         *                     time:
         *                       type: string
         *                     interval:
         *                       type: number
         *                     temperature_2m:
         *                       type: number
         *                       nullable: true
         *                     relative_humidity_2m:
         *                       type: number
         *                       nullable: true
         *                     rain:
         *                       type: number
         *                       nullable: true
         *                     weather_code:
         *                       type: number
         *                       nullable: true
         *       422:
         *         description: Missing, blank, non-numeric or out-of-range coordinate.
         *       502:
         *         description: Upstream HTTP failure with data.status, or data.reason identifying network, timeout, invalid_json or invalid_payload. Internal error details are not exposed.
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
                return weatherDataSchema.parse(await response.json());
            } catch (error) {
                if (error instanceof Errors.MoleculerError) throw error;
                let reason = "network";
                if (error instanceof z.ZodError) reason = "invalid_payload";
                else if (error instanceof SyntaxError) reason = "invalid_json";
                else if (error instanceof Error && error.name === "TimeoutError")
                    reason = "timeout";
                this.logger.warn({ reason, err: error }, "Weather upstream request failed");
                throw new Errors.MoleculerError(
                    "Weather upstream request failed",
                    502,
                    "WEATHER_UPSTREAM_ERROR",
                    { reason },
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

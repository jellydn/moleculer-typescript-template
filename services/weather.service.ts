import type { Context, Service, ServiceSchema } from "moleculer";

export type WeatherData = {
    current: {
        temperature_2m: number;
        relative_humidity_2m: number;
        rain: number;
        weather_code: number;
    };
};

export type GetWeatherParams = {
    latitude: string;
    longitude: string;
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
        getCurrentWeather: {
            rest: "GET /",
            params: {
                latitude: { type: "string", min: 6, max: 25 },
                longitude: { type: "string", min: 6, max: 25 },
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
            const response = await fetch(`${this.settings.weatherApiUrl}?${queryParams}`);
            if (!response.ok) {
                throw new Error(`Weather API error: ${response.statusText}`);
            }
            return response.json();
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

import {
	extendZodWithOpenApi,
	OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import yaml from "yaml";
import { z } from "zod";

extendZodWithOpenApi(z);

export const welcomeSchema = {
	username: z.string().min(4).max(25).openapi({
		description: "User name",
		example: "John Doe",
	}),
};

// Write to same folder with the DTO file
const outputDirectory = __dirname;

export const WelcomeSchema = z.object(welcomeSchema).openapi("welcomeDTO", {
	description: "Welcome DTO",
});

export const WelcomeResponseSchema = z.string().openapi("welcomeResponseDTO", {
	example: "Welcome, Alex",
});

const generator = new OpenApiGeneratorV3([
	WelcomeSchema,
	WelcomeResponseSchema,
]);
const components = generator.generateComponents();

// Write to YAML file
writeFileSync(
	resolve(outputDirectory, "greeter-dto.swagger.yaml"),
	yaml.stringify(components)
);

---
to: services/dtos/<%= name %>.dto.ts
---
import {
	extendZodWithOpenApi,
	OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import yaml from "yaml";
import { z } from "zod";

extendZodWithOpenApi(z);

// Define your <%= name %> schema here
export const <%= name %>Schema = {
	name: z.string().min(1).max(100).openapi({
		description: "<%= h.capitalize(name) %> name",
		example: "Sample <%= name %>",
	}),
	description: z.string().min(1).max(500).openapi({
		description: "<%= h.capitalize(name) %> description",
		example: "This is a sample <%= name %>",
	}),
};

// Write to same folder with the DTO file
const outputDirectory = __dirname;

export const <%= h.capitalize(name) %>Schema = z.object(<%= name %>Schema).openapi("<%= name %>DTO", {
	description: "<%= h.capitalize(name) %> DTO",
});

export const <%= h.capitalize(name) %>ResponseSchema = z.object({
	success: z.boolean().openapi({
		description: "Operation success status",
		example: true,
	}),
	message: z.string().openapi({
		description: "Response message",
		example: "<%= h.capitalize(name) %> operation completed successfully",
	}),
	data: <%= h.capitalize(name) %>Schema.optional().openapi({
		description: "<%= h.capitalize(name) %> data",
	}),
}).openapi("<%= name %>ResponseDTO", {
	description: "<%= h.capitalize(name) %> response DTO",
});

export const ErrorResponseSchema = z.object({
	error: z.string().openapi({
		description: "Error message",
		example: "Parameters validation error!",
	}),
	code: z.string().optional().openapi({
		description: "Error code",
		example: "VALIDATION_ERROR",
	}),
}).openapi("errorResponseDTO", {
	description: "Error response DTO",
});

const generator = new OpenApiGeneratorV3([
	<%= h.capitalize(name) %>Schema,
	<%= h.capitalize(name) %>ResponseSchema,
	ErrorResponseSchema,
]);
const components = generator.generateComponents();

// Write to YAML file
writeFileSync(
	resolve(outputDirectory, "<%= name %>-dto.swagger.yaml"),
	yaml.stringify(components)
);

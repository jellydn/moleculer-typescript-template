import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { OpenApiGeneratorV3, extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import yaml from "yaml";
import { z } from "zod";

// Extend Zod with OpenAPI
extendZodWithOpenApi(z);

export const addCartSchema = {
    name: z.string().openapi({ description: "Name of the product", example: "Iphone" }),
    qty: z.number().openapi({
        description: "Quantity of the product",
        example: 1,
    }),
    price: z.number().optional().openapi({
        description: "Price of the product",
        example: 1000,
    }),
    billing: z
        .object({
            address: z.string().optional(),
            city: z.string(),
            zip: z.number(),
            country: z.string(),
        })
        .optional(),
};

// Write to same folder with the DTO file
const outputDirectory = __dirname;

const Schema = z.object(addCartSchema).openapi("addCartDTO", {
    description: "Add cart DTO",
});
const ResponseSchema = z
    .object({
        success: z.boolean().openapi({ description: "Success flag", example: true }),
        message: z.string().openapi({ description: "Message", example: "Product added to cart" }),
    })
    .openapi("addCartResponseDTO", {
        description: "Add cart response DTO",
    });
const generator = new OpenApiGeneratorV3([Schema, ResponseSchema]);
const components = generator.generateComponents();

// Write to YAML file
writeFileSync(resolve(outputDirectory, "product-dto.swagger.yaml"), yaml.stringify(components));

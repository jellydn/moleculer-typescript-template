import { type Context, Errors, type GenericObject } from "moleculer";
import { z } from "zod";

import { logger } from "../../logger";

/**
 * Validates request parameters using a Zod schema
 * @param ctx - Moleculer context containing the parameters to validate
 * @param schema - Zod schema object to validate against
 * @throws {Errors.ValidationError} When validation fails
 */
export const validateParams = <T extends z.ZodRawShape>(
	ctx: Context<unknown, Record<string, unknown>, GenericObject>,
	schema: T
): void => {
	const compiled = z.object(schema).strict();
	try {
		const parsedParams = compiled.parse(ctx.params);
		logger.info("Validated parameters: %o", parsedParams);
	} catch (err) {
		if (err instanceof z.ZodError) {
			throw new Errors.ValidationError(
				"Parameters validation error!",
				"VALIDATION_ERROR",
				err.issues
			);
		}

		throw err;
	}
};

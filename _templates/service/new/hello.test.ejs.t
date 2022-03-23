---
to: test/unit/services/<%= name %>.spec.ts
---
import { Errors, ServiceBroker } from "moleculer";

import TestService from "../../../services/<%= name %>.service";

const { ValidationError } = Errors;

describe("Test '<%= name %>' service", () => {
	const broker = new ServiceBroker({ logger: false });
	broker.createService(TestService);

	beforeAll(async () => broker.start());
	afterAll(async () => broker.stop());

	describe("Test '<%= name %>.hello' action", () => {
		it("should return with 'Hello Moleculer'", async () => {
			const response = await broker.call("<%= name %>.hello");
			expect(response).toBe("Hello Moleculer");
		});
	});

	describe("Test '<%= name %>.welcome' action", () => {
		it("should return with 'Welcome'", async () => {
			const response = await broker.call("<%= name %>.welcome", {
				name: "Adam",
			});
			expect(response).toBe("Welcome, Adam");
		});

		it("should reject an ValidationError", async () => {
			expect.assertions(1);
			try {
				await broker.call("<%= name %>.welcome");
			} catch (error: unknown) {
				expect(error).toBeInstanceOf(ValidationError);
			}
		});
	});
});

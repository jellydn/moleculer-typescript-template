/* eslint-disable @typescript-eslint/naming-convention */
import { Errors, ServiceBroker } from "moleculer";

import TestGreeterService from "../../../services/greeter.service";

const { ValidationError } = Errors;

describe("Test 'greeter' service", () => {
	const broker = new ServiceBroker({ logger: false });
	broker.createService(TestGreeterService);

	beforeAll(async () => broker.start());
	afterAll(async () => broker.stop());

	describe("Test 'greeter.hello' action", () => {
		it("should return with 'Hello Moleculer'", async () => {
			const response = await broker.call("greeter.hello");
			expect(response).toBe("Hello Moleculer");
		});
	});

	describe("Test 'greeter.welcome' action", () => {
		it("should return with 'Welcome'", async () => {
			const response = await broker.call("greeter.welcome", {
				username: "Adam",
			});
			expect(response).toBe("Welcome, Adam");
		});

		it("should reject an ValidationError", async () => {
			expect.assertions(2);
			try {
				await broker.call("greeter.welcome");
			} catch (error: unknown) {
				expect(error).toBeInstanceOf(ValidationError);
			}

			try {
				await broker.call("greeter.welcome", {
					username: "a1",
				});
			} catch (error: unknown) {
				expect(error).toBeInstanceOf(ValidationError);
			}
		});
	});
});

import { Errors, ServiceBroker, type ServiceSchema } from "moleculer";
import { ZodValidator } from "moleculer-zod-validator";

import TestService from "../../../services/product.service";

// eslint-disable-next-line @typescript-eslint/naming-convention
const { ValidationError } = Errors;

describe("Test 'product' service", () => {
    const broker = new ServiceBroker({
        logger: false,
        validator: new ZodValidator(),
    });
    broker.createService(TestService as unknown as ServiceSchema);

    beforeAll(async () => broker.start());
    afterAll(async () => broker.stop());

    describe("Test 'product.addToCart' action", () => {
        it("should return success message", async () => {
            const response = await broker.call("product.addToCart", {
                name: "iPhone",
                qty: 1,
            });
            expect(response).toEqual({
                success: true,
                message: "You added 1 iPhone to your cart",
            });
        });

        it("should reject an ValidationError", async () => {
            expect.assertions(1);
            try {
                await broker.call("product.addToCart");
            } catch (error: unknown) {
                expect(error).toBeInstanceOf(ValidationError);
            }
        });
    });
});

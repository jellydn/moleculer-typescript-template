---
to: test/unit/<%= name %>.spec.ts
---
import { Errors, ServiceBroker } from 'moleculer';

import TestService from '../../services/<%= name %>/<%= name %>.service';

const { ValidationError } = Errors;

describe("Test '<%= name %>' service", () => {
  const broker = new ServiceBroker({ logger: false });
  broker.createService(TestService);

  beforeAll(async () => broker.start());
  afterAll(async () => broker.stop());

  describe("Test '<%= name %>.create' action", () => {
    it("should return with 'create'", async () => {
      const response = await broker.call<{ message: string }, any>('<%= name %>.create', {
        <%= name %>: {
          location: 'Singapore',
        },
      });
      expect(response.message).toBe('Created successfully');
    });

    it('should reject an ValidationError', async () => {
      expect.assertions(1);
      try {
        await broker.call('<%= name %>.create');
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(ValidationError);
      }
    });
  });
});

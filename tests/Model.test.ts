import { describe, expect, it } from "@jest/globals";
import { Model } from "../src/Model";
import { z } from "zod";

describe("Model", () => {
  it("should create a model with a Zod schema", () => {
    const zod_schema = z.object({ name: z.string(), age: z.number() });
    const model = new Model(zod_schema);

    const validData = { name: "Alice", age: 30 };
    expect(model.validate(validData)).toEqual(validData);

    const invalidData = { name: "Alice", age: "thirty" };
    expect(() => model.validate(invalidData)).toThrow();
  });

  it("should infer schema from an example object", () => {
    const exampleObject = { name: "Bob", age: 25 };
    const model = new Model(exampleObject);

    const validData = { name: "Bob", age: 25 };
    expect(model.validate(validData)).toEqual(validData);

    const invalidData = { name: "Bob", age: "twenty-five" };
    expect(() => model.validate(invalidData)).toThrow();
  });

  it("should infer schema from a TypeScript type", () => {
    class Person {
      name = "Charlie";
      age = 40;
    }

    const model = new Model(Person);

    const validData = { name: "Charlie", age: 40 };
    expect(model.validate(validData)).toEqual(validData);

    const invalidData = { name: "Charlie", age: "forty" };
    expect(() => model.validate(invalidData)).toThrow();
  });

  it("should dump data to JSON string", () => {
    const schema = z.object({ name: z.string(), age: z.number() });
    const model = new Model(schema);

    const data = { name: "David", age: 35 };
    expect(model.dumpJson(data)).toBe(JSON.stringify(data));
  });

  it("should build a schema digest", () => {
    const schema = z.object({ name: z.string(), age: z.number() });
    const model = new Model(schema);

    const digestPattern = /^model:[a-f0-9]{64}$/;
    expect(model.buildSchemaDigest()).toMatch(digestPattern);
  });

  it("should handle nested objects when inferring schema", () => {
    const exampleObject = {
      user: {
        name: "Emma",
        details: {
          age: 29,
          active: true
        }
      }
    };
    const model = new Model(exampleObject);

    const validData = {
      user: {
        name: "Emma",
        details: {
          age: 29,
          active: true
        }
      }
    };
    expect(model.validate(validData)).toEqual(validData);

    const invalidData = {
      user: {
        name: "Emma",
        details: {
          age: "twenty-nine",
          active: true
        }
      }
    };
    expect(() => model.validate(invalidData)).toThrow();
  });

  it("should handle arrays when inferring schema", () => {
    const exampleObject = { tags: ["typescript", "zod"] };
    const model = new Model(exampleObject);

    const validData = { tags: ["typescript", "zod"] };
    expect(model.validate(validData)).toEqual(validData);

    const invalidData = { tags: "typescript" };
    expect(() => model.validate(invalidData)).toThrow();
  });

  it("should throw an error for invalid constructor argument", () => {
    expect(() => new Model(123 as any)).toThrow("Invalid input. Provide a Zod schema, example object, or TypeScript type.");
  });

  it("should correctly validate optional fields", () => {
    const schema = z.object({
      name: z.string(),
      age: z.number().optional()
    });
    const model = new Model(schema);

    const validData = { name: "Alice" };
    expect(model.validate(validData)).toEqual(validData);

    const validDataWithAge = { name: "Alice", age: 30 };
    expect(model.validate(validDataWithAge)).toEqual(validDataWithAge);

    const invalidData = { name: "Alice", age: "thirty" };
    expect(() => model.validate(invalidData)).toThrow();
  });

  it("should validate complex objects with multiple levels of nesting", () => {
    const exampleObject = {
      user: {
        profile: {
          name: "John Doe",
          settings: {
            theme: "dark",
            notifications: {
              email: true,
              sms: false
            }
          }
        }
      }
    };
    const model = new Model(exampleObject);

    const validData = {
      user: {
        profile: {
          name: "John Doe",
          settings: {
            theme: "dark",
            notifications: {
              email: true,
              sms: false
            }
          }
        }
      }
    };
    expect(model.validate(validData)).toEqual(validData);

    const invalidData = {
      user: {
        profile: {
          name: "John Doe",
          settings: {
            theme: "dark",
            notifications: {
              email: "yes",
              sms: false
            }
          }
        }
      }
    };
    expect(() => model.validate(invalidData)).toThrow();
  });

  it("should throw an error if Model is created without arguments", () => {
    expect(() => new Model()).toThrow("Invalid input. Provide a Zod schema, example object, or TypeScript type.");
  });
});

import { describe, it, expect } from "vitest";
import { exampleLoginSchema } from "../schema/example";
import { testData } from "../testData";

describe("Example login schema", () => {
  it("Should pass with valid data", () => {
    const validData = {
      email: testData.validEmail,
      password: testData.validPassword,
    };

    const validationResult = exampleLoginSchema.safeParse(validData);
    expect(validationResult.success).toBe(true);
  });

  it("Should fail when required fields are missing", () => {
    const invalidData = {
      email: testData.emptyString,
      password: testData.emptyString,
    };

    const validationResult = exampleLoginSchema.safeParse(invalidData);
    expect(validationResult.success).toBe(false);
  });

  it("Should fail when the email is invalid", () => {
    const invalidData = {
      email: testData.invalidEmail,
      password: testData.validPassword,
    };

    const validationResult = exampleLoginSchema.safeParse(invalidData);
    expect(validationResult.success).toBe(false);
  });

  it("Should fail when the password is invalid", () => {
    const invalidData = {
      email: testData.validEmail,
      password: testData.invalidPassword,
    };

    const validationResult = exampleLoginSchema.safeParse(invalidData);
    expect(validationResult.success).toBe(false);
  });
});

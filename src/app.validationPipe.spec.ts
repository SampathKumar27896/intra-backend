import { BadRequestException } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "./app.validationPipe";

const schema = z.object({
  name: z.string(),
  age: z.number(),
});

describe("ZodValidationPipe", () => {
  let pipe: ZodValidationPipe;
  beforeEach(() => {
    pipe = new ZodValidationPipe(schema);
  });

  it("should return parsed value when validation succeeds", () => {
    const input = {
      name: "john",
      age: 24,
    };
    expect(pipe.transform(input)).toEqual(input);
  });

  it("should throw BadRequestException for invalid input", () => {
    const input = {
      name: "john",
      age: "twenty",
    };
    expect(() => pipe.transform(input)).toThrow(BadRequestException);
  });
});

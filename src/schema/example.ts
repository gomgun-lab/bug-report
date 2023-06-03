import { z } from "zod";

const errorMessages = {
  required: "This field is required.",
  email: "Invalid email.",
  passwordMinLength: "Password must be at least 8 characters.",
  passwordMaxLength: "Password must be no more than 16 characters.",
  passwordPattern:
    "Password must contain a combination of lowercase letters, numbers, and uppercase letters.",
};

const {
  required,
  email,
  passwordMinLength,
  passwordMaxLength,
  passwordPattern,
} = errorMessages;

export const exampleLoginSchema = z.object({
  email: z.string().min(1, { message: required }).email({ message: email }),
  password: z
    .string()
    .min(8, { message: passwordMinLength })
    .max(16, { message: passwordMaxLength })
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,16}$/, {
      message: passwordPattern,
    }),
});

export type ExampleLoginSchema = z.infer<typeof exampleLoginSchema>;

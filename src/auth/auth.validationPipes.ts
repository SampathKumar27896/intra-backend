import { z } from "zod";

export const registerUserSchema = z
  .object({
    userName: z.string({
      error: () => "Please provide a valid User name.",
    }),
    email: z.email({
      error: () => "Please provide a valid email id.",
    }),
    password: z.string(),
    retypePassword: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.retypePassword;
    },
    { message: "Passwords don't match", path: ["retypePassword"] },
  );

export type RegisterUserDto = z.infer<typeof registerUserSchema>;

import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required"),
});

export type LoginFormValues =
  z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must contain at least 2 characters")
      .max(50, "First name is too long"),

    lastName: z
      .string()
      .trim()
      .min(2, "Last name must contain at least 2 characters")
      .max(50, "Last name is too long"),

    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Enter a valid email address"),

    password: z
      .string()
      .min(8, "Password must contain at least 8 characters")
      .max(100, "Password is too long"),

    confirmPassword: z
      .string()
      .min(1, "Confirm your password"),
  })
  .refine(
    (values) =>
      values.password === values.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );

export type RegisterFormValues =
  z.infer<typeof registerSchema>;
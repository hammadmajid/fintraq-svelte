import { z } from "zod";

export const SignUpForm = z.object({
  firstName: z.string().min(1, "Name must contain at least 1 character"),
  lastName: z.string().min(1, "Name must contain at least 1 character"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must contain at least 6 characters"),
});

export const SignInForm = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must contain at least 6 characters"),
});

import { Str } from "chanfana";
import { z } from "zod";

export const SignUpForm = z.object({
  first_name: Str(),
  last_name: Str(),
  email: z.string().email(),
  password: z.string().min(6),
});

export const SignInForm = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

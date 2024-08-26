import { Bool, OpenAPIRoute } from "chanfana";
import { Scrypt } from "lucia";
import { SignUpForm } from "$types";

import { z } from "zod";
import { drizzle } from "drizzle-orm/d1";

import { getUser, insertUser } from "functions/users";
import { initializeLucia } from "db/lucia";

export class SignUp extends OpenAPIRoute {
  schema = {
    tags: ["Auth"],
    summary: "Create a new user",
    request: {
      body: {
        content: {
          "application/json": {
            schema: SignUpForm,
          },
        },
      },
    },
    responses: {
      "200": {
        description: "Returns the created user",
        content: {
          "application/json": {
            schema: z.object({
              series: z.object({
                success: Bool().default(false),
              }),
            }),
          },
        },
      },
    },
  };

  async handle(c) {
    // Get validated data
    const data = await this.getValidatedData<typeof this.schema>();

    const { firstName, lastName, email, password } = data.body;

    const db = drizzle(c.env.DB);

    const existingUser = await getUser(db, email);
    if (existingUser) {
      return c.json({ error: "User with that email already exists." }, 400);
    }

    const passwordHash = await new Scrypt().hash(password);

    const user = await insertUser(db, {
      name: firstName + " " + lastName,
      email,
      password: passwordHash,
    });
    if (!user) {
      return c.json({ error: "An error occurred during sign up." }, 500);
    }

    const lucia = initializeLucia(c.env.DB);
    const session = await lucia.createSession(user.id, {});
    const cookie = lucia.createSessionCookie(session.id);

    c.header("Set-Cookie", cookie.serialize(), { append: true });

    return {
      success: true,
    };
  }
}

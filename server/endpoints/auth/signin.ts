import { Bool, OpenAPIRoute } from "chanfana";
import { Scrypt } from "lucia";
import { SignInForm } from "$types";

import { z } from "zod";
import { drizzle } from "drizzle-orm/d1";

import { getUser, insertUser } from "functions/users";
import { initializeLucia } from "db/lucia";

export class SignIn extends OpenAPIRoute {
  schema = {
    tags: ["Auth"],
    summary: "Authenticate a user",
    request: {
      body: {
        content: {
          "application/json": {
            schema: SignInForm,
          },
        },
      },
    },
    responses: {
      "200": {
        description: "Returns the authenticated user",
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

    // Retrieve the validated request body
    const { email, password } = data.body;

    const db = drizzle(c.env.DB);

    const user = await getUser(db, email);
    if (!user) {
      return c.json({ error: "Invalid email or password." }, 400);
    }

    const validPassword = await new Scrypt().verify(user.password, password);
    if (!validPassword) {
      return c.json({ error: "Invalid email or password." }, 400);
    }

    const lucia = initializeLucia(c.env.DB);
    const session = await lucia.createSession(user.id, {});
    const cookie = lucia.createSessionCookie(session.id);

    c.header("Set-Cookie", cookie.serialize(), { append: true });

    return c.json({ success: true })
  }
}

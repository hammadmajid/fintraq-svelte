import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { SignInForm } from "$types";

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
                success: Bool(),
                result: z.object({
                  task: SignInForm,
                }),
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
    const userToCreate = data.body;

    // TODO: Implement signin with lucia

    // return the new task
    return {
      success: true,
      task: {
        email: userToCreate.email,
      },
    };
  }
}

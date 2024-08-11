import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { SignUpForm } from "$types";

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
                success: Bool(),
                result: z.object({
                  task: SignUpForm,
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

    // TODO: Implement signup with lucia

    // return the new task
    return {
      success: true,
      task: {
        full_name: userToCreate.first_name + " " + userToCreate.last_name,
        email: userToCreate.email,
      },
    };
  }
}

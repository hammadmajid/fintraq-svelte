import type { Actions } from "./$types";
import { fail } from "@sveltejs/kit";

import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { message } from "sveltekit-superforms";

import { SignUpForm } from "@types";
// import axios from "axios";

export const load = async () => {
  const form = await superValidate(zod(SignUpForm));

  return { form };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(SignUpForm));

    if (!form.valid) {
      return fail(400, { form });
    }

    await sleep(2000);

    // TODO: post the form data to auth/signup server route
    // TODO: somehow trigger goto() after success
    // const data = await axios.post('')

    return message(form, "Form posted successfully!");
  },
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

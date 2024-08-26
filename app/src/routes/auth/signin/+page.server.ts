import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";

import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";


import { SignInForm } from "@types";

export const load = async () => {
  return {
    form: await superValidate(zod(SignInForm)),
  };
};
export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(SignInForm));

    if (!form.valid) {
      return fail(400, { form });
    }

    return redirect(307, '/app/profile');
  },
};

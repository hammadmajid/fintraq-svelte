
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

import { SignUpForm } from "@types";

export const load = async () => {
  return {
		form: await superValidate(zod(SignUpForm)),
	};
};

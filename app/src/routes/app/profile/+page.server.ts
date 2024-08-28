import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {

  const session = locals.session;

  if (!session) {
    redirect(302, "/auth/signin")
  }

  return
}

export const actions: Actions = {
  signout: async ({ locals, cookies }) => {
    cookies.delete("session", {
      path: '/'
    });
    locals.session = undefined;
  }
};

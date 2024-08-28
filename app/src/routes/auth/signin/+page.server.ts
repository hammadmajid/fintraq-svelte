import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";

import { superValidate, message } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

// @ts-ignore
import setCookie from 'set-cookie-parser';

import { API_URL } from "$env/static/private";

import { SignInForm } from "@types";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.session) {
    redirect(302, '/app/profile');
  }

  return {
    form: await superValidate(zod(SignInForm)),
  };
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {

    const form = await superValidate(request, zod(SignInForm));

    if (!form.valid) {
      return fail(400, { form });
    }

    const data = form.data;

    try {
      const response = await fetch(`${API_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      });

      if (response.status !== 200) {
        return message(form, 'Invalid username or password')
      }

      const sessionCookie = setCookie.parse(response.headers.getSetCookie()[0])[0];

      cookies.set("session", sessionCookie.value, {
        path: sessionCookie.path,
        httpOnly: sessionCookie.httpOnly,
        sameSite: sessionCookie.sameSite,
        maxAge: sessionCookie.maxAge,
        secure: sessionCookie.secure,
      })

      return redirect(302, '/app/profile');
    } catch (err) {
      return message(form, 'Internal server error');
    }
  },
};

import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";

import { message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

import { API_URL } from "$env/static/private";

// @ts-ignore
import setCookie from 'set-cookie-parser';

import { SignUpForm } from "@types";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.session) {
    redirect(302, '/app/profile');
  }

  return {
    form: await superValidate(zod(SignUpForm)),
  };
};
export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const form = await superValidate(request, zod(SignUpForm));

    if (!form.valid) {
      return fail(400, { form });
    }

    const data = form.data;

    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    });
    const parsed = await response.json();

    console.log(parsed);
    if (response.status !== 200) {
      return message(form, 'Failed to create an account')
    }

    const sessionCookie = setCookie.parse(response.headers.getSetCookie()[0])[0];

    cookies.set("session", sessionCookie.value, {
      path: sessionCookie.path,
      httpOnly: sessionCookie.httpOnly,
      sameSite: sessionCookie.sameSite,
      maxAge: sessionCookie.maxAge,
      secure: sessionCookie.secure,
    })

    return redirect(307, '/app/profile');
  },
};

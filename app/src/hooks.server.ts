import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.session = event.cookies.get("session");

  return resolve(event);
}

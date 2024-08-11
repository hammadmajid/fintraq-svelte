import { fromHono } from "chanfana";
import { Hono } from "hono";

import { SignUp } from "endpoints/auth/signup";
import { SignIn } from "endpoints/auth/signin";

// Start a Hono app
const app = new Hono();

// Setup OpenAPI registry
const openapi = fromHono(app, {
	docs_url: "/",
});

// Register OpenAPI endpoints
openapi.post("/auth/signin", SignIn);
openapi.post("/auth/signup", SignUp);

// Export the Hono app
export default app;

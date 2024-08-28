import { fromHono } from "chanfana";
import { Hono } from "hono";
import { csrf } from "hono/csrf";
import { cors } from "hono/cors";
import { logger } from 'hono/logger'

import { SignUp } from "endpoints/auth/signup";
import { SignIn } from "endpoints/auth/signin";

import { Bindings } from "./bindings";
import { authMiddleware } from "middleware";

// Start a Hono app
const app = new Hono<{ Bindings: Bindings }>();

// Middleware configuratio
app.use(logger());
app.use("*", cors({
  origin: "https://fintraq.pages.dev",
  allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
  maxAge: 600,
  credentials: true,
}));
app.use(csrf({ origin: "https://fintraq.pages.dev" }));
app.use("*", authMiddleware);

// Setup OpenAPI registry
const openapi = fromHono(app, {
  docs_url: "/",
});

// Register OpenAPI endpoints
openapi.post("/auth/signin", SignIn);
openapi.post("/auth/signup", SignUp);

// Export the Hono app
export default app;

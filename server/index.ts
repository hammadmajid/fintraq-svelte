import { fromHono } from "chanfana";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from 'hono/logger'

import { SignUp } from "endpoints/auth/signup";
import { SignIn } from "endpoints/auth/signin";

import { Bindings } from "bindings";
import { authMiddleware } from "middleware";

// Start a Hono app
const app = new Hono<{ Bindings: Bindings }>();

// Middleware configuratio
app.use(logger());
app.use("*", cors({
  origin: "https://fintraq.pages.dev/",
  allowHeaders: [
    'Content-Type',
    'Authorization',
    'Accept',
    'X-Requested-With'
  ],
  allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
  exposeHeaders: [
    'Content-Type',
    'Authorization',
  ],
  maxAge: 600,
  credentials: true,
}));
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

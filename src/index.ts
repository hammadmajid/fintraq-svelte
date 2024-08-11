import { fromHono } from "chanfana";
import { Hono } from "hono";

// Start a Hono app
const app = new Hono();

// Setup OpenAPI registry
const openapi = fromHono(app, {
	docs_url: "/",
});

// Register OpenAPI endpoints
openapi.get("/api/tasks", () => JSON.stringify({ hello: "world" }));

// Export the Hono app
export default app;

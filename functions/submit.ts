/**
 * POST /<mount>/api/submit — proves a non-GET method registers, and that a GET
 * to this path answers 405 rather than falling through to the app.
 *
 * Also reports whether env reached the handler. Reports presence only, never a
 * value: these responses are public.
 */
import { declareFunction } from "@webflow/functions/cloud";

export default declareFunction(
  async (ctx) => ({
    message: "submitted",
    app: "astro7",
    route: "/api/submit",
    envKeyCount: Object.keys(ctx.env).length,
  }),
  { method: "POST" }
);

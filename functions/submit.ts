/**
 * POST /<mount>/api/submit — proves a non-GET method registers, and that a GET
 * to this path answers 405 rather than falling through to the app.
 *
 * Also reports whether env reached the handler. Reports presence only, never a
 * value: these responses are public.
 */
export default {
  config: { method: "POST" },
  async fetch(request, context) {
    const env = context?.env ?? {};
    return Response.json({
      message: "submitted",
      app: "astro7",
      route: "/api/submit",
      envKeyCount: Object.keys(env).length,
    });
  },
};

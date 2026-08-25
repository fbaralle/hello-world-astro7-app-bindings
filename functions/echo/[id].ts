/** GET /<mount>/api/echo/:id — proves [id] becomes a matched route parameter. */
export default {
  config: { method: "GET" },
  async fetch(request, context) {
    return Response.json({
      message: "echo",
      app: "astro7",
      id: context?.params?.id ?? null,
      route: "/api/echo/:id",
    });
  },
};

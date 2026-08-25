/** GET /<mount>/api/status/health — proves a folder becomes a path segment. */
export default {
  config: { method: "GET" },
  async fetch() {
    return Response.json({ message: "ok", app: "astro7", route: "/api/status/health" });
  },
};

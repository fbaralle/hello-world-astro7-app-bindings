/**
 * GET /<mount>/api/hello
 *
 * Smoke test for the Cloud Functions pipeline: build -> deploy -> reachable.
 *
 * Written as a raw FetchableFunction rather than via declareFunction() so the
 * fixture needs no dependency installed. That matters for the static app (which
 * has no package.json at all) and keeps all three fixtures identical, so a
 * failure points at the pipeline rather than at one app's node_modules.
 */
export default {
  config: { method: "GET" },
  async fetch() {
    return Response.json({
      message: "hello from webflow cloud functions",
      app: "astro7",
      route: "/api/hello",
    });
  },
};

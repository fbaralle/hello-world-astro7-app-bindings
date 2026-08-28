/**
 * GET /<mount>/api/hello
 *
 * Smoke test for the Cloud Functions pipeline: build -> deploy -> reachable.
 *
 * Authored with declareFunction(): the handler returns plain JSON data and the
 * wrapper builds the Response. `method` defaults to GET on the Cloud surface,
 * so simple read endpoints declare no config at all.
 *
 * Exporting a raw `{ config, fetch }` object is also supported (see the
 * static-app fixture, which has no package.json and therefore no dependency to
 * import) but gives up the typed context.
 */
import { declareFunction } from "@webflow/functions/cloud";

export default declareFunction(async () => ({
  message: "hello from webflow cloud functions",
  app: "astro7",
  route: "/api/hello",
}));

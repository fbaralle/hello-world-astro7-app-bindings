/** GET /<mount>/api/status/health — proves a folder becomes a path segment. */
import { declareFunction } from "@webflow/functions/cloud";

export default declareFunction(async () => ({
  message: "ok",
  app: "astro7",
  route: "/api/status/health",
}));

/**
 * GET /<mount>/api/echo/:id — proves [id] becomes a matched route parameter.
 *
 * The matched segment arrives on `ctx.params`, typed by the FunctionContext
 * type argument. Route params are merged over any decoded query/body params,
 * and win on a name collision.
 */
import { declareFunction, type FunctionContext } from "@webflow/functions/cloud";

export default declareFunction(
  async (ctx: FunctionContext<{ id: string }>) => ({
    message: "echo",
    app: "astro7",
    id: ctx.params.id,
    route: "/api/echo/:id",
  })
);

import { Hono } from "hono";
import { handle } from "hono/cloudflare-pages";
import { KVNamespace } from "@cloudflare/workers-types";

type Env = {
  Bindings: {
    SAITAMAJS_KV: KVNamespace;
  };
};

const app = new Hono<Env>();

app.get("/api/counter", async (c) => {
  const visited = await c.env.SAITAMAJS_KV.get("counter");
  const count = Number(visited) + 1;
  await c.env.SAITAMAJS_KV.put("counter", count.toString());
  return c.json({
    counter: count,
  });
});

export const onRequest = handle(app);

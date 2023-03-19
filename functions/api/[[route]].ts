import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/cloudflare-pages";
import { KVNamespace } from "@cloudflare/workers-types";
import { counter } from "./handlers/counter";

export type Env = {
  Bindings: {
    SAITAMAJS_KV: KVNamespace;
    ORIGIN_HOST: string;
  };
};

const app = new Hono<Env>();
app.use('*', cors({ origin: "*.saitamajs.pages.dev" }));
app.get("/api/counter", counter);

export const onRequest = handle(app);

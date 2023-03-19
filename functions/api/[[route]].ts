import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/cloudflare-pages";
import { KVNamespace } from "@cloudflare/workers-types";
import { counter } from "./handlers/counter";
import { createMessage, getMessage } from "./handlers/message";

export type Env = {
  Bindings: {
    SAITAMAJS_KV: KVNamespace;
    ORIGIN_HOST: string;
    ["MICROCMS-API-KEY"]: string;
  };
};

const app = new Hono<Env>();
app.use('*', cors({ origin: (origin) => origin }));
app.get("/api/counter", counter);
app.get("/api/message", getMessage);
app.post("/api/message", createMessage);

export const onRequest = handle(app);

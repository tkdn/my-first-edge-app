import { Handler } from "hono/dist/types";
import { Env } from "../[[route]]";

export const counter: Handler<Env, "/api/counter"> = async (c) => {
  const visited = await c.env.SAITAMAJS_KV.get("counter");
  const count = Number(visited) + 1;
  await c.env.SAITAMAJS_KV.put("counter", count.toString());
  return c.json({
    counter: count,
  });
};

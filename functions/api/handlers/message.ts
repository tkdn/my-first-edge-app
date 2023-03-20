import { Handler } from "hono/dist/types";
import { Env } from "../[[route]]";

const endpoint = "https://tkdn.microcms.io/api/v1/boards";

export const getMessage: Handler<Env> = async (c) => {
  const res = await fetch(endpoint, {
    headers: {
      "X-MICROCMS-API-KEY": c.env["MICROCMS-API-KEY"],
    },
  });
  const messages = await res.json();
  return c.json(messages);
};

export const createMessage: Handler<Env> = async (c) => {
  const payload = await c.req.json<{ message: string }>();
  await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      "X-MICROCMS-API-KEY": c.env["MICROCMS-API-KEY"],
    },
  });

  c.status(201);
  return c.json({ success: true });
};

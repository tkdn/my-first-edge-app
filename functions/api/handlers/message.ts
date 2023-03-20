import { HTTPException } from "hono/http-exception";
import { Handler } from "hono/dist/types";
import striptags from "striptags";
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
  const { message } = await c.req.json<{ message: string }>();
  const stripped = striptags(message);
  if (!stripped) {
    throw new HTTPException(400, { message: "Bad messages." });
  }
  await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({ message: stripped }),
    headers: {
      "Content-Type": "application/json",
      "X-MICROCMS-API-KEY": c.env["MICROCMS-API-KEY"],
    },
  });

  c.status(201);
  return c.json({ success: true });
};

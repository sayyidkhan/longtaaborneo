import {
  createStartHandler,
  defaultStreamHandler,
  type RequestHandler,
} from "@tanstack/react-start/server";
import type { Register } from "@tanstack/react-router";

import { directionContract } from "./design-contract";

const appFetch = createStartHandler(defaultStreamHandler);

const fetch: RequestHandler<Register> = async (...args) => {
  const response = await appFetch(...args);
  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("text/html") || !response.body) return response;

  const html = await response.text();
  const contractComment = `<!--\n${directionContract.trim()}\n-->`;
  const body = html.replace(/<body([^>]*)>/i, `<body$1>${contractComment}`);
  const headers = new Headers(response.headers);
  headers.delete("content-length");

  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};

export default { fetch };

import { APIError } from "../classes/APIError";
import { ServerError } from "../types/ServerError";

/* eslint-disable @typescript-eslint/no-explicit-any */
const base = "http://localhost:5001";

export default async function apiFetch<T>({
  path,
  method,
  body,
  queryParams,
}: {
  path: string;
  method: string;
  body?: Record<string, any>;
  queryParams?: Record<string, any>;
}) {
  const url = new URL(`${base}${path}`);
  if (queryParams) url.search = new URLSearchParams(queryParams).toString();

  const results = await fetch(url.toString(), { method, body: JSON.stringify(body) });
  const data = await results.json();

  if (data.errors) {
    const error: ServerError = data.errors[0];
    throw new APIError(error.message, results.status, error.code);
  }

  return data as T;
}

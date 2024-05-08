import { APIError } from "../classes/APIError";
import { ServerError } from "../types/ServerError";

/* eslint-disable @typescript-eslint/no-explicit-any */
const base = "http://localhost:5001";

/**
 * Makes an API request and returns the response data.
 *
 * @template T - The type of the response data.
 * @param {Object} options - The options for the API request.
 * @param {string} options.path - The path of the API endpoint.
 * @param {string} options.method - The HTTP method for the request.
 * @param {Record<string, any>} [options.body] - The request body.
 * @param {Record<string, any>} [options.queryParams] - The query parameters for the request.
 * @returns {Promise<T>} - A promise that resolves to the response data.
 * @throws {APIError} - If the API response contains errors.
 */
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

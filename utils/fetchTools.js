/**********************************************
 *             GENERIC FETCH TOOLS            *
 **********************************************/

/***
 * transform the response into a json object
 */
const getJson = (res) => res.json();

/**
 * Return a promise from a GET request
 * @param {*} url to fetch content from
 * @param {*} options to fetch content
 */
function get(url, options) {
  options.method = "GET";
  return fetch(url, options).then(getJson);
}

/**
 * Return a promise from a POST request
 * @param {*} url to post at
 * @param {*} options to post
 */
function post(url, options) {
  options.method = "POST";
  return fetch(url, options).then(getJson);
}

/**
 * fetches json fromatted data
 * @param {*} url to fetch content from
 * @param {*} options to fetch content
 */
export async function fetchJson(url, options = {}) {
  options.headers = {
    Accept: "application/json",
  };

  return get(url, options);
}

/**
 * posting formated data
 * @param {*} url to post at
 * @param {*} body content to post
 * @param {*} options to post with
 */
export async function postJson(url, body, options = {}) {
  options.headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...options.headers,
  };

  options.body = JSON.stringify(body);

  return post(url, options);
}

/**
 * Posting raw data no information about the type of content
 * @param {*} url to post at
 * @param {*} body data to post
 * @param {*} options to post with
 */
export async function postRaw(url, body, options = {}) {
  options.body = body;

  return post(url, options);
}

/**********************************************
 *             GRAPHQL FETCH TOOLS            *
 **********************************************/

/***
 * Fetch model to query data from the API
 * @param query a graphQL query
 */
export async function gqQuery(url, query, options = {}) {
  const body = {
    query: query,
  };

  return postJson(url, body, options);
}

/***
 * Check if a response contains an eror
 * @param response to a fetch request
 */
export function hasError(response) {
  return typeof response.error !== "undefined" || response.errors;
}

/***
 * Get the error message from a fetch request
 * @param response to a fetch request
 */
export function getErrorMessage(response) {
  if (response.errors) {
    return response.errors[0].message;
  }

  if (typeof response.error !== "undefined") {
    console.log(response);
    return response.message[0].messages[0].message;
  }
}

/**
 * Queryfy.
 *
 * Prep javascript objects for interpolation within graphql queries.
 *
 * @param {mixed} obj
 * @return template string.
 */
export function queryfy(obj) {
  // Make sure we don't alter integers.
  if (obj === null) {
    return null;
  }

  // Make sure we don't alter integers.
  if (typeof obj === "number") {
    return obj;
  }

  // Stringify everything other than objects.
  if (typeof obj !== "object" || Array.isArray(obj)) {
    return JSON.stringify(obj);
  }

  // Iterate through object keys to convert into a string
  // to be interpolated into the query.
  let props = Object.keys(obj)
    .map((key) => `${key}:${queryfy(obj[key])}`)
    .join(",");

  return `{${props}}`;
}

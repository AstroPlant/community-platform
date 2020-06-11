export const API_URL = "https://api.astroplant.sda-projects.nl";

/***
 * GET request template
 * @param apiPath the path of the api where to send the request
 */
async function getRequest(apiPath) {
  const url = API_URL + apiPath;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return res.json();
}

/***
 * POST request template
 * @param apiPath the path of the api where to send the request
 */
async function postRequest(apiPath, body) {
  const url = API_URL + apiPath;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body,
  });

  return res;
}

/***
 * Logs the user and stores the token cookies
 * @param username the username from the user
 * @param password the user's password
 */
export async function login(username, password) {
  const path = "/me/auth";

  const body = JSON.stringify({
    username: username,
    password: password,
  });

  const res = await postRequest(path, body);

  return res;
}

/***
 * Creates a new user
 * @param username the username from the user
 * @param password the user's password
 * @param email the user's email
 */
export async function signup(username, password, email) {
  const path = "/users";

  const body = JSON.stringify({
    username: username,
    password: password,
    email: email,
  });

  const res = await postRequest(path, body);

  return res;
}

/***
 * Refreshes the accessToken with the refreshToken
 * return true on success false on failure
 * @param refreshToken the token use to refresh the access
 */
export async function refreshAccessToken(refreshToken) {
  const path = "/me/refresh";

  const body = JSON.stringify({
    refreshToken: refreshToken,
  });

  const res = await postRequest(path, body);

  return res;
}

/***
 * Fetch the version of the API
 */
export async function getAPIVersion() {
  const res = await getRequest("/version");
  return res;
}

/***
 * Fetch the details of a user
 * @param username the username of the wanted user
 */
export async function getUserDetails(username) {
  const path = `/users/${username}`;
  const res = await getRequest(path);
  return res;
}

/***
 * Fetch the membership of a user
 * @param username the username of the wanted user
 */
export async function getUserKits(username) {
  const path = `/users/${username}/kit-memberships`;
  const res = await getRequest(path);
  return res;
}

/***
 * Fetch all the public kits
 */
export async function getKits() {
  const res = await getRequest("/kits");
  return res;
}

/***
 * Fetch a specific
 * @param serial the serial of the wanted kit
 */
export async function getKitBySerial(serial) {
  const path = "/kits/" + serial;
  const res = await getRequest(path);
  return res;
}

export async function getKitConfigsBySerial(serial) {
  const path = "/kit-configurations?kitSerial=" + serial;
  const res = await getRequest(path);
  return res;
}

export async function getKitPeripherals() {
  const path =
    "/peripheral-definitions?after=" + 0 + "&withExpectedQuantityTypes=true";
  const res = await getRequest(path);
  return res;
}

export async function getKitPeripheralByID(id) {
  const json = await getKitPeripherals();
  return json[id - 1];
}

export async function getQuantityTypes() {
  let url = API_URL + "/quantity-types?after=0";
  const res = await getRequest(url);
  return res;
}

export async function getQuantityTypesByID(id) {
  const json = await getQuantityTypes();
  return json[id - 1];
}

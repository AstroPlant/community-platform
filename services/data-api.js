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

  if (res.status === 200) {
    return res.json();
  } else {
    console.log(res);
    return {};
  }
}

/***
 * POST request template
 * @param apiPath the path of the api where to send the request
 */
async function postRequest(apiPath, body) {
  const url = API_URL + apiPath;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: body,
    });

    return res;
  } catch (error) {
    return {};
  }
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
export async function getUserMemberships(username) {
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

/***
 * Fetch kit configuration by serial
 * @param serial the serial of the wanted kit
 */
export async function getKitConfigsBySerial(serial) {
  const path = `/kits/${serial}/configurations`;
  const res = await getRequest(path);
  return res;
}

/***
 * Fetch kit configuration by serial
 * @param serial the serial of the wanted kit
 */
export async function getActiveConfigBySerial(serial) {
  let activeConfig = {};

  const path = `/kits/${serial}/configurations`;

  try {
    const res = await getRequest(path);

    for (let config of res) {
      if (config.active) {
        activeConfig = config;
      }
    }

    return activeConfig;
  } catch (error) {
    return activeConfig;
  }
}

/***
 * Returns a kit with it's active configuration fully completed
 * @param serial the serial of the fetched kit
 */
export async function getFullKit(serial) {
  let kit = {};

  try {
    // fetch the kit's basic infos
    let kit = await getKitBySerial(serial);

    // fetch the kit's current active config
    kit.config = await getActiveConfigBySerial(kit.serial);

    /* for each peripherals and quantity types we get their details and add
     * them to the config
     */
    for (let peripheral of kit.config.peripherals) {
      peripheral.details = await getPeripheralDetails(
        peripheral.peripheralDefinitionId
      );
      peripheral.details.quantityTypes = [];
      for (let q of peripheral.details.expectedQuantityTypes) {
        peripheral.details.quantityTypes.push(await getQuantityTypeDetails(q));
      }
    }
    return kit;
  } catch (error) {
    return kit;
  }
}

export async function getAllPeripherals() {
  const path = "/peripheral-definitions?after=0&withExpectedQuantityTypes=true";
  return await getRequest(path);
}

export async function getPeripheralDetails(id) {
  const json = await getAllPeripherals();
  return json[id - 1];
}

export async function getQuantityTypes() {
  let path = "/quantity-types?after=0";
  const res = await getRequest(path);
  return res;
}

export async function getQuantityTypeDetails(id) {
  const json = await getQuantityTypes();
  return json[id - 1];
}

/***
 * function that returns the measurments based on a kit serial and other sorting parameters
 * @param serial the kit serial. required
 * @param optionalParameters can be configurationId, peripheralId, quantityTypeId
 */
export async function getKitMeasures(
  serial,
  optionalParameters = ({ configurationId, peripheralId, quantityTypeId } = {})
) {
  let path = `/kits/${serial}/aggregate-measurements?`;

  // Building parameters string
  let params = Object.keys(optionalParameters)
    .map((key) => {
      if (typeof optionalParameters[key] !== "undefined") {
        return key.substring(0, key.length - 2) + "=" + optionalParameters[key];
      }
    })
    .join("&");

  // Building complete url
  const url = API_URL + path + params;

  // fetching measures
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const measures = await res.json();

  if (res.status === 200 && measures.length !== 0) {
    // headers are of type Headers
    const unparsedLink = res.headers.get("link");
    const parsedLink = unparsedLink.match(/<(.*?)>/)[1];

    return { next: parsedLink, measures: measures };
  } else {
    console.log(res);
    return [];
  }
}

/***
 * fetch more measures
 * @param nextLink the link present on the previous response header
 */
export async function getMoreMeasures(nextLink) {
  const url = API_URL + nextLink;

  // fetching measures
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const measures = await res.json();

  if (res.status === 200 && measures.length !== 0) {
    // headers are of type Headers
    const unparsedLink = res.headers.get("link");
    const parsedLink = unparsedLink.match(/<(.*?)>/)[1];

    return { next: parsedLink, measures: measures };
  } else {
    console.log(res);
    return [];
  }
}

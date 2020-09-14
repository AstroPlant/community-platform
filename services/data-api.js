import { fetchJson, hasError, postJson } from "../utils/fetchTools";

export const API_URL = "https://api.astroplant.sda-projects.nl";

function postRequest(path, body, options) {
  const url = API_URL + path;
  return postJson(url, body, options);
}

function getRequest(path, options) {
  const url = API_URL + path;
  return fetchJson(url, options);
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
  return getRequest(path);
}

/***
 * Fetch the membership of a user
 * @param username the username of the wanted user
 */
export async function getUserMemberships(username) {
  const path = `/users/${username}/kit-memberships`;
  return getRequest(path);
}

/***
 * Fetch all the public kits
 */
export async function getKits() {
  const path = `/kits`;
  return getRequest(path);
}

/***
 * Fetch a specific kit
 * @param serial of the kit
 */
export async function getKitBySerial(serial) {
  const path = `/kits/${serial}`;
  return getRequest(path);
}

/***
 * Fetch kit configurations
 * @param serial of the kit
 */
export async function getKitConfigsBySerial(serial) {
  const path = `/kits/${serial}/configurations`;
  return getRequest(path);
}

/***
 * Fetch the active configuration of a kit
 * @param serial of the kit
 */
export async function getActiveConfigBySerial(serial) {
  let activeConfig = {};

  const path = `/kits/${serial}/configurations`;

  const res = await getRequest(path);

  if (!hasError(res)) {
    for (let config of res) {
      if (config.active) {
        activeConfig = config;
      }
    }
  }

  return activeConfig;
}

/***
 * Returns a full kit with its active configuration
 * @param serial of the kit
 */
export async function getFullKit(serial) {
  let kit = {};

  try {
    // fetch the kit's basic infos
    let kit = await getKitBySerial(serial);

    // fetch the kit's current active config
    kit.config = await getActiveConfigBySerial(serial);

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

/**
 * Fetches a list of all the known peripheral definitions
 */
export async function getAllPeripherals() {
  const path = "/peripheral-definitions?after=0&withExpectedQuantityTypes=true";
  return getRequest(path);
}

/**
 * Fetches a specific peripheral definition
 * @param {number} id of the peripheral definition
 */
export async function getPeripheralDetails(id) {
  const allPeripherals = await getAllPeripherals();
  return allPeripherals[id - 1];
}

/**
 * Fetches a list of all the known quantity types
 */
export async function getQuantityTypes() {
  let path = "/quantity-types?after=0";
  return getRequest(path);
}

/**
 * Fetch a specific quantity type
 * @param {number} id of the quantityType
 */
export async function getQuantityTypeDetails(id) {
  const allQuantities = await getQuantityTypes();
  return allQuantities[id - 1];
}

/**
 * Fetches an array of measure and it's cursor if there is one
 * @param {string} url of the measures
 */
async function getMeasures(url) {
  let next = null;
  let measures = [];

  // fetching measures
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (res.ok) {
    measures = await res.json();

    // headers are of type Headers
    const unparsedLink = res.headers.get("link");

    if (unparsedLink != null) {
      next = unparsedLink.match(/<(.*?)>/)[1];
    }
  }

  return { next, measures };
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

  return getMeasures(url);
}

/***
 * Fetch more measures
 * @param nextLink the "next" link present on the previous response header
 */
export async function getMoreMeasures(nextLink) {
  const url = API_URL + nextLink;

  return getMeasures(url);
}

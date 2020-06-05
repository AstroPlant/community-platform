export const API_URL = "https://api.astroplant.sda-projects.nl";

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

export async function getAPIVersion() {
  const res = await getRequest("/version");
  return res;
}

export async function getKits() {
  const res = await getRequest("/kits");
  return res;
}

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

const axios = require("axios");
const jwtDecode = require("jwt-decode");
const DATA_API_URL = "https://api.astroplant.sda-projects.nl";
const formatError = (error) => [
  { messages: [{ id: error.id, message: error.message, field: error.field }] },
];

/**
 * Helper functions to log using astroplant auth & tokens
 */
module.exports = {
  /***
   * Checks the validity of the given token
   * @param token a json web token
   */
  tokenIsExpired(token) {
    // using valueOf() to avoid timezone errors
    const currentTime = Date.now().valueOf() / 1000;

    try {
      let decoded = jwtDecode(token);
      return Number(decoded.exp) < Number(currentTime);
    } catch (err) {
      return false;
    }
  },

  /***
   * refresh the access token using the data API
   * @param refreshToken valid to refresh the accessToken
   */
  async refresh(ctx, refreshToken) {
    try {
      const res = await axios.post(DATA_API_URL + "/me/refresh", {
        refreshToken: refreshToken,
      });
      // getting the infos from the request to the data API
      const json = await res.data;
      return json.accessToken;
    } catch (err) {
      return ctx.badRequest(
        null,
        formatError({
          id: "Auth.dataAPI.error.invalidToken",
          message: "Could not refresh access Token.",
        })
      );
    }
  },

  /***
   * Tries to log the user on the data api
   * return tokens if success
   */
  async login(ctx, params) {
    try {
      const res = await axios.post(DATA_API_URL + "/me/auth", {
        username: params.identifier,
        password: params.password,
      });

      // getting the infos from the request to the data API
      const json = await res.data;

      const refreshToken = json.refreshToken;
      const accessToken = json.accessToken;

      if (
        this.tokenIsExpired(accessToken) &&
        !this.tokenIsExpired(refreshToken)
      ) {
        accessToken = await refreshToken(ctx, refreshToken);
      }
      return {
        refreshToken: json.refreshToken,
        accessToken: json.accessToken,
      };
    } catch (err) {
      return ctx.badRequest(
        null,
        formatError({
          id: "Auth.dataAPI.form.error.invalid",
          message: "Could not log on data API. Identifier or password invalid.",
        })
      );
    }
  },

  /***
   * Creates a new user on the data API
   */
  async signup(ctx, params) {
    console.log("Creating user on data API...");
    // If the user doesn't exist on the DATA API then he is created there
    try {
      const res = await axios.post(DATA_API_URL + "/users", {
        username: params.username,
        emailAddress: params.email,
        password: params.password,
      });

      console.log("User created on data API");

      return true;
    } catch (err) {
      // If there is an error
      // if user already exist on the data API, then we don't create it there but we continue here.
      try {
        const res = await axios.get(DATA_API_URL + `/users/${params.username}`);

        console.log("User already exist on data API");

        return true;
      } catch (err) {
        // else we return an error

        console.log("Could not create user on data API");

        return ctx.badRequest(
          null,
          formatError({
            id: "Auth.dataAPI.form.error.invalid",
            message: "Could not create user on data API.",
          })
        );
      }
    }
  },
};

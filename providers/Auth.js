import { jwtDecode } from "jwt-decode";
import React from "react";
import { Cookies } from "react-cookie";
import { login } from "../services/community";

const cookies = new Cookies();
const options = { path: "/", sameSite: true };

// Creating authentication context
const AuthContext = React.createContext({
  isAuthenticated: false,
  isLoading: true,
  setAuthenticated: () => {},
});

// Authenticated if I have a refreshToken in my cookies
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const initializeAuth = async () => {
      setAuthenticated(loggedIn());
      setLoading(false);
    };
    initializeAuth();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        setAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/***
 * Hook to use the Authentication context
 */
export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

/***
 * Set a token into cookies
 * @param name of the token
 * @param value of the token
 */
function setToken(name, value) {
  const options = { path: "/", sameSite: true };

  cookies.set(name, value, options);
}

/***
 * Get a token from cookies
 * @param name of the token to retrieve
 */
export function getToken(name) {
  return cookies.get(name);
}

/***
 * Set a user into cookies
 * @param username of the
 */
function setLoggedUser(username) {
  cookies.set("username", username, options);
}

/***
 * Get a user from cookies
 * @param name of the token to retrieve
 */
export function getLoggedUser(ctx) {
  const onBrowser = typeof window !== "undefined";

  if (onBrowser) {
    return cookies.get("username");
  } else {
    if (ctx) {
      return getCookieFromHttp(ctx.req.headers.cookie, "username");
    } else {
      return " ";
    }
  }
}

/***
 * Checks if any user is authenticated
 * Checks if there is a saved token and it's still valid
 */
export function loggedIn() {
  const token = getToken("refreshToken");
  return !!token && !tokenIsExpired(token); // handwaiving here
}

/***
 * Logs the user in and saves the token into local storage
 */
export async function authenticate(username, password) {
  const response = await login(username, password);

  if (response.status === 200) {
    const json = await response.json();

    setToken("accessToken", json.accessToken);
    setToken("refreshToken", json.refreshToken);
    setLoggedUser(username);
    return true;
  } else {
    return false;
  }
}

/***
 * Removes items from local storage
 */
export function logout() {
  cookies.remove("accessToken");
  cookies.remove("refreshToken");
}

/***
 * Checks the validity of the given token
 * @param token a json web token
 */
export function tokenIsExpired(token) {
  // using valueOf() to avoid timezone errors
  const currentTime = Date.now().valueOf() / 1000;

  try {
    let decoded = jwtDecode(token);
    return Number(decoded.exp) < Number(currentTime);
  } catch (err) {
    return false;
  }
}

/***
 * parse the cookies in http header to find the value of the
 * cookie given
 * @param httpCookies the cookies string from https
 * @param cookieName the name of the cookie we want to retrieve
 */
export function getCookieFromHttp(httpCookies, cookieName) {
  let cookie = "";
  const onBrowser = typeof window !== "undefined";

  if (onBrowser) {
    cookie = cookies.get(cookieName);
    return cookie;
  } else {
    const toFind = cookieName + "=";
    const cookiesArray = httpCookies.split(";");

    for (let unparsedCookie of cookiesArray) {
      if (unparsedCookie.includes(toFind)) {
        cookie = unparsedCookie.replace(toFind, "").replace(" ", "");
      }
    }

    return cookie;
  }
}

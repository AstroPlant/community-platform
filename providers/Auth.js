import cookie from "cookie";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { Cookies } from "react-cookie";
import { API_URL, login } from "../services/community";

const cookies = new Cookies();
const options = { path: "/", sameSite: true };

/* Creating authentication context
 * Contains a user object and a isLogged boolean
 * the isLoading boolean is used to avoid loading unauthorized pages
 */
const AuthContext = React.createContext({
  user: {},
  isLogged: false,
  isLoading: true,
  setLogged: () => {},
});

// Provider passing the AuthContext to the app
export const AuthProvider = ({ children }) => {
  // passing context values to states to avoid too many rendering
  const [user, setUser] = React.useState({});
  const [isLogged, setLogged] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const initializeAuth = async () => {
      setLogged(loggedIn());
      setUser(getLoggedUser());
      setLoading(false);
    };

    initializeAuth();
  }, [isLogged]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogged,
        isLoading,
        setLogged,
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

/******************************************
 *              Log in tools              *
 *****************************************/

/***
 * Sends the login request to the community API
 * saves the token into local storage on success
 * @param username the username to try to authenticate
 * @param password the password of the user
 */
export async function authenticate(username, password) {
  const response = await login(username, password);

  if (response.status === 200) {
    const json = await response.json();

    setToken("accessToken", json.accessToken);
    setToken("refreshToken", json.refreshToken);
    setToken("communityToken", json.communityToken);

    const loggedUser = {
      id: json.user.id,
      username: username,
      avatarUrl:
        json.user.picture && API_URL + json.user.picture.formats.thumbnail.url,
      role: json.user.role,
    };

    console.log(loggedUser);
    setLoggedUser(loggedUser);
    return true;
  } else {
    return false;
  }
}

/***
 * Checks if any user is logged in
 * by verifying the presence and validity of the community token
 */
export function loggedIn() {
  const token = getToken("communityToken");
  return !!token && !tokenIsExpired(token); // handwaiving here
}

/***
 * Set the logged user into cookies
 * @param user to save as cookie
 */
function setLoggedUser(user) {
  cookies.set("user", user, options);
}

/***
 * Get the currently logged user from cookies (local or http)
 */
export function getLoggedUser(httpCookies) {
  const onBrowser = typeof window !== "undefined";

  if (onBrowser) {
    return cookies.get("user");
  } else {
    let user = undefined;

    if (httpCookies) {
      const stringUser = getCookieFromHttp(httpCookies, "user");
      user = JSON.parse(stringUser);
    }

    return user;
  }
}

/***
 * Removes items from local storage
 */
export function logout() {
  cookies.remove("accessToken");
  cookies.remove("refreshToken");
  cookies.remove("user");
  cookies.remove("communityToken");
}

/*************************************
 *          Token utilities          *
 *************************************/

/***
 * Set a token as cookies
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
 * parse the given http cookies and return the value connected to cookieName
 * @param httpCookies the cookies string from https
 * @param cookieName the name of the cookie we want to retrieve
 */
export function getCookieFromHttp(httpCookies, cookieName) {
  let cookieValue = "";

  if (httpCookies) {
    const jsonCookies = cookie.parse(httpCookies);
    cookieValue = jsonCookies[cookieName];
  }

  return cookieValue;
}

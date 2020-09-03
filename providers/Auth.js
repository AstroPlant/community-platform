import cookie from "cookie";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { Cookies } from "react-cookie";
import { getUserDetails } from "../services/community";

const cookies = new Cookies();
const defaultOptions = { path: "/", sameSite: true, maxAge: 3600 };

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
 * @param rememberMe if the cookies should be stored indefinetly of not
 */
export function authenticate(authInfos, rememberMe) {
  const cookieOptions = defaultOptions;

  if (rememberMe) {
    cookieOptions.maxAge = null;
  }

  setLoggedUser(authInfos.user, cookieOptions);
  setToken("accessToken", authInfos.accessToken, cookieOptions);
  setToken("refauthInfoshToken", authInfos.refreshToken, cookieOptions);
  setToken("communityToken", authInfos.communityToken, cookieOptions);
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
 * @param options parameters for the cookies
 */
function setLoggedUser(user, options) {
  const currentUser = cookies.get("user");
  let loggedUser = {};

  console.log(user);
  console.log(currentUser);

  if (typeof currentUser !== "undefined") {
    loggedUser = {
      id: user.id || currentUser.id,
      username: user.username || currentUser.username,
      email: user.email || currentUser.email,
      avatar: user.avatar || currentUser.avatar,
      description: user.description || currentUser.description,
      firstName: user.firstName || currentUser.firstName,
      lastName: user.lastName || currentUser.lastName,
      slackUsername: user.slackUsername || currentUser.slackUsername,
      role: user.role || currentUser.role,
    };
  } else {
    loggedUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      description: user.description,
      firstName: user.firstName,
      lastName: user.lastName,
      slackUsername: user.slackUsername,
      role: user.role,
    };
  }

  cookies.set("user", loggedUser, options);
}

/***
 * Get the currently logged user from cookies (local or http)
 */
export function getLoggedUser(httpCookies) {
  const onBrowser = typeof window !== "undefined";

  if (onBrowser) {
    return cookies.get("user");
  } else {
    let user = null;

    if (httpCookies) {
      const stringUser = getCookieFromHttp(httpCookies, "user");
      user = JSON.parse(stringUser);
    }

    return user;
  }
}

/***
 * Update the current users local information with information from the api
 * @param username of the user to update
 */
export async function updateLoggedUser(username) {
  const res = await getUserDetails(username);

  if (!res.error && !res.errors) {
    setLoggedUser(res, { path: "/", sameSite: true });
    return cookies.get("user");
  } else {
    return res;
  }
}

/***
 * Removes items from local storage
 */
export function logout() {
  cookies.remove("communityToken");
  cookies.remove("accessToken");
  cookies.remove("refreshToken");
  cookies.remove("user");
}

/*************************************
 *          Token utilities          *
 *************************************/

/***
 * Set a token as cookies
 * @param name of the token
 * @param value of the token
 */
function setToken(name, value, options) {
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

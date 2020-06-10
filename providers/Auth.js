import React from "react";
import { login } from "../services/data-api";
import { jwtDecode } from "jwt-decode";

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

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

/***
 * Set a token into localstorage
 */
function setToken(name, value) {
  const options = { path: "/", sameSite: true };

  localStorage.setItem(name, value, options);
}

/***
 * Get a token from localstorage
 */
function getToken(name) {
  return localStorage.getItem(name);
}

/***
 * Checks if any user is authenticated
 * Checks if there is a saved token and it's still valid
 */
export function loggedIn() {
  const options = { secure: true, httpOnly: true, sameSite: true };

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
    return true;
  } else {
    console.log("Not Auth");
    return false;
  }
}

/***
 * Removes items from local storage
 */
export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
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

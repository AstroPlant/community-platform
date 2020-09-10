import React, { createContext, useEffect, useState } from "react";
import SnackBar from "../components/SnackBar";

const SnackBarContext = createContext();

const SCREEN_TIME = 5000;

export default function SnackBarProvider({ children }) {
  const [alerts, setAlerts] = useState([]);

  const activeAlertsIds = alerts.map((alert) => alert.message);

  // Removing the oldest alert after 5 seconds
  useEffect(() => {
    if (activeAlertsIds.length > 0) {
      const timer = setTimeout(
        () => setAlerts((alerts) => alerts.slice(0, alerts.length - 1)),
        SCREEN_TIME
      );
      return () => clearTimeout(timer);
    }
  }, [activeAlertsIds]);

  /**
   * Adds an alert to the list
   * @param {string} type of the alert (succes or error)
   * @param {string} message to be displayed in the snackbar
   */
  function addAlert(type, message) {
    const alert = { type, message };
    setAlerts((alerts) => [alert, ...alerts]);
  }

  /**
   * Removes an alert from the list by filtering its ID (message) out
   * @param {string} alertID id of the alert to remove in this case its the message
   */
  function removeAlert(alertID) {
    setAlerts((alerts) => alerts.filter((alert) => alert.message !== alertID));
  }

  return (
    <SnackBarContext.Provider value={{ addAlert, removeAlert }}>
      {children}
      {alerts.map((alert) => (
        <SnackBar key={alert.message} alert={alert} />
      ))}
    </SnackBarContext.Provider>
  );
}

export function useSnackBars() {
  const context = React.useContext(SnackBarContext);
  if (context === undefined) {
    throw new Error("useSnackBars must be used within an SnackBarProvider");
  }
  return context;
}

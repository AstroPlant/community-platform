import { format, parseISO } from "date-fns";
import PropTypes from "prop-types";
import React from "react";

export default function Date({ dateString, ...props }) {
  const date = parseISO(dateString);
  return <p {...props}>{format(date, "MMMM d, yyyy")}</p>;
}

Date.propTypes = {
  /**
   * Date to display in string format
   */
  dateString: PropTypes.string.isRequired,
};

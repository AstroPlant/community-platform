import { format, parseISO } from "date-fns";
import PropTypes from "prop-types";
import React from "react";

export default function Date(props) {
  const date = parseISO(props.dateString);
  return <p className={props.className}>{format(date, "MMMM d, yyyy")}</p>;
}

Date.propTypes = {
  className: PropTypes.string,
  /* Date to display in string format */
  dateString: PropTypes.string.isRequired,
};

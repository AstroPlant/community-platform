import { format, parseISO } from "date-fns";
import PropTypes from "prop-types";
import React from "react";

export default function Date({ className, dateString }) {
  const date = parseISO(dateString);
  return <p className={className}>{format(date, "MMMM d, yyyy")}</p>;
}

Date.propTypes = {
  className: PropTypes.string,
  dateString: PropTypes.string.isRequired,
};

import { format, parseISO } from "date-fns";
import PropTypes from "prop-types";
import React from "react";

export default function Date({ dateString }) {
  const date = parseISO(dateString);
  return <p>{format(date, "MMMM d yyyy")}</p>;
}

Date.propTypes = {
  dateString: PropTypes.string.isRequired,
};

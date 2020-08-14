import { format, parseISO } from "date-fns";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const StyledDate = styled.p`
  color: ${(props) => props.theme.grey};
  font-style: italic;
`;

export default function Date({ dateString, ...props }) {
  const date = parseISO(dateString);

  return <StyledDate {...props}>{format(date, "MMMM d, yyyy")}</StyledDate>;
}

Date.propTypes = {
  /**
   * Date to display in string format
   */
  dateString: PropTypes.string.isRequired,
};

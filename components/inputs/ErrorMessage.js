import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Error = styled.p`
  margin-bottom: 1rem;
  font-size: 14px;
  color: ${(props) => props.theme.error};
`;

export default function ErrorMessage(props) {
  return <Error>{props.message}</Error>;
}

ErrorMessage.propTypes = {
  /* message to display */
  message: PropTypes.string.isRequired,
};

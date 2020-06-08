import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Error = styled.p`
  margin-bottom: 1rem;
  font-size: 14px;
  color: red;
`;

export default function ErrorMessage({ errorMessage }) {
  return <Error>{errorMessage}</Error>;
}

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

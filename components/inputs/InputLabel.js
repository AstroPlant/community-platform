import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Label = styled.label`
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  color: white;
  letter-spacing: 0.025em;
`;

export default function InputLabel(props) {
  return <Label {...props}>{props.label}</Label>;
}

InputLabel.propTypes = {
  label: PropTypes.string.isRequired,
};

import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Label = styled.label`
  margin-bottom: 0.75rem;

  font-size: 14px;
  text-transform: capitalize;
  letter-spacing: 0.025em;

  color: ${(props) => props.theme.light};
`;

export default function InputLabel({ label, ...props }) {
  return <Label {...props}>{label}</Label>;
}

InputLabel.propTypes = {
  /**
   * Label to display
   */
  label: PropTypes.string.isRequired,
};

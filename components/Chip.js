import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.5rem 1rem;
  margin-right: 1rem;

  border-radius: 50px;

  background-color: ${(props) => props.theme.secondaryDark};
`;

export default function Chip({ label, ...props }) {
  return <Container {...props}>{label}</Container>;
}

Chip.propTypes = {
  /**
   * label of the chip
   */
  label: PropTypes.string.isRequired,
};

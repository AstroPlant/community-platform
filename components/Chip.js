import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1rem;
  background-color: #0072ff;
`;

export default function Chip({ label }) {
  return <Container>{label}</Container>;
}

Chip.propTypes = {
  label: PropTypes.string.isRequired,
};

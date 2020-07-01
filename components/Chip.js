import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.5rem 1rem;
  border-radius: 50px;

  margin-right: 1rem;
  background-color: ${(props) => props.theme.secondaryDark};
`;

export default function Chip({ label }) {
  return <Container>{label}</Container>;
}

Chip.propTypes = {
  label: PropTypes.string.isRequired,
};

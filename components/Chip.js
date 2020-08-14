import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: auto;

  padding: 0.25rem 0.5rem;
  margin: 0 1rem 0 0;

  border-radius: 4px;

  background-color: ${(props) => props.theme[props.color]};

  text-transform: uppercase;
  font-size: 14px;
  font-weight: 300;
`;

export default function Chip({ label, color, ...props }) {
  return (
    <Container color={color} {...props}>
      {label}
    </Container>
  );
}

Chip.propTypes = {
  /**
   * label of the chip
   */
  label: PropTypes.string.isRequired,
  /**
   * color of the chip
   */
  color: PropTypes.string,
};

Chip.defaultProps = {
  color: "secondaryDark",
};

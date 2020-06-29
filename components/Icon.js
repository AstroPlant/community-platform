import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0.5rem;
  fill: ${(props) => props.theme[props.color]};
  font-size: ${(props) => props.size}px;

  cursor: pointer;
`;

export default function Icon({ children, color, size }) {
  return (
    <Content color={color} size={size}>
      {children}
    </Content>
  );
}

Icon.propTypes = {
  children: PropTypes.node.isRequired,
  /* String corresponding to a theme color e.g "primary" */
  color: PropTypes.string,
  /* The size of the icon in pixels */
  size: PropTypes.number,
};

Icon.defaultProps = {
  color: "light",
  size: 16,
};

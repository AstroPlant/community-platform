import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0.5rem;
  fill: ${(props) => props.color};
  font-size: ${(props) => props.size};

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
  color: PropTypes.string,
  size: PropTypes.string,
};

Icon.defaultProps = {
  color: "#FFF",
  size: "1rem",
};

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

export default function Icon(props) {
  return (
    <Content className={props.className} color={props.color} size={props.size}>
      {props.children}
    </Content>
  );
}

Icon.propTypes = {
  /**
   * SVG component to place inside the Icon markups
   */
  children: PropTypes.node.isRequired,
  /**
   * String corresponding to a theme color e.g "primary"
   */
  color: PropTypes.string,
  /**
   *  The size of the icon in pixels
   */
  size: PropTypes.number,
  /**
   * Styling class of the container. Used by styled-components.
   */
  className: PropTypes.string,
};

Icon.defaultProps = {
  color: "light",
  size: 16,
};

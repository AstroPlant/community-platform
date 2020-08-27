import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const HoverBar = styled.div`
  position: absolute;
  top: 0%;
  left: 0%;

  height: 4px;
  width: 100%;
  transform: scale(0);

  background-color: transparent;
  transition: background-color 0.3s ease, transform 0.3s ease;
`;

const Container = styled.div`
  position: relative;
  display: flex;

  width: 100%;
  height: 100%;

  padding: 1.5rem;

  background-color: ${(props) => props.theme.darkLight};

  border-radius: ${(props) => props.theme.radiusMin};

  overflow: hidden;

  &:hover {
    cursor: ${(props) => props.clickable && "pointer"};
  }

  &:hover ${HoverBar} {
    background-color: ${(props) => props.theme.primary};
    transform: scale(1);
  }
`;

export default function Card({ animateOnHover, children, ...props }) {
  return (
    <Container clickable={animateOnHover} {...props}>
      {animateOnHover && <HoverBar />}
      {children}
    </Container>
  );
}

Card.propTypes = {
  /**
   * Card content
   */
  children: PropTypes.node,
  /**
   * Whether or not to animate the card on hover
   */
  animateOnHover: PropTypes.bool,
};

Card.defaultProps = {
  animateOnHover: false,
};

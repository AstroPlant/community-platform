import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const HoverBar = styled.div`
  position: absolute;
  top: 0%;
  left: 0%;

  height: 2px;
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

  background-color: ${(props) => props.theme.darkLight};

  padding: 1.5rem;

  &:hover {
    cursor: ${(props) => props.clickable && "pointer"};
  }

  &:hover ${HoverBar} {
    background-color: ${(props) => props.theme.primary};
    transform: scale(1);
  }
`;

export default function Card(props) {
  return (
    <Container clickable={props.animateOnHover} className={props.className}>
      {props.animateOnHover && <HoverBar />}
      {props.children}
    </Container>
  );
}

Card.propTypes = {
  /* Styling class of the container. Used by styled-components. */
  className: PropTypes.string,
  /* Card content */
  children: PropTypes.node,
  /* Whether or not to animate the card on hover */
  animateOnHover: PropTypes.bool,
};

Card.defaultProps = {
  animateOnHover: false,
};

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

  &:hover ${HoverBar} {
    background-color: ${(props) => props.theme.primary};
    transform: scale(1);
  }
`;

export default function Card(props) {
  return (
    <Container className={props.className}>
      {props.animateOnHover && <HoverBar />}
      {props.children}
    </Container>
  );
}

Card.propTypes = {
  /* className to customize the component with styled-component */
  className: PropTypes.string,
  /* node contained is the cards */
  children: PropTypes.node,
  /* Should the card be animated when hovered */
  animateOnHover: PropTypes.bool,
};

Card.defaultProps = {
  animateOnHover: false,
};

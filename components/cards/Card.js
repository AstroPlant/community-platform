import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: flex;

  width: 100%;
  height: 100%;

  padding: 1.5rem;

  color: ${(props) => props.theme.light};
  background-color: ${(props) => props.theme.darkLight};

  border-radius: ${(props) => props.theme.radiusMin};

  overflow: hidden;

  transition: ${(props) =>
    props.animateOnHover && "color 0.3s ease-out, transform 0.3s ease"};

  &:hover h3 {
    color: ${(props) => props.animateOnHover && props.theme.primary};
  }

  &:hover {
    transform: ${(props) =>
      props.animateOnHover && "translateY(-10px) scale(1)"};
    cursor: ${(props) => props.animateOnHover && "pointer"};
  }
`;

export default function Card({ animateOnHover, children, ...props }) {
  return (
    <Container animateOnHover={animateOnHover} {...props}>
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

import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: block;

  width: 100%;
  height: 100%;

  background-color: ${(props) => props.theme.darkLight};

  padding: 1.5rem;

  transition: border 0.3s ease-out;

  &:hover {
    border: 1px solid ${(props) => props.theme.primary};
  }
`;

export default function Card({ children, className }) {
  return <Container className={className}>{children}</Container>;
}

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

Card.defaultProps = {};

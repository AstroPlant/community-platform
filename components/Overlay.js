import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 0%;
  left: 0%;

  z-index: 3;

  height: 100vh;
  width: 100vw;

  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.9);
`;

export default function Overlay(props) {
  return <Container show={props.show}>{props.children}</Container>;
}

Overlay.propTypes = {
  /* Whether or not to show the overlay */
  show: PropTypes.bool,
  /* Content of the overlay */
  children: PropTypes.node,
};

Overlay.defaultProps = {
  show: false,
};

import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Split = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  height: 100vh;

  @media (screen and max-width: 1024px) {
    display: block;
  }
`;

export default function SplitLayout(props) {
  return <Split>{props.children}</Split>;
}

SplitLayout.propTypes = {
  /* Content of the layout */
  children: PropTypes.node.isRequired,
};

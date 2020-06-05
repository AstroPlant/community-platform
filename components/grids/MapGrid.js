import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const GridContainer = styled.div`
  display: grid;
  grid-gap: ${(props) => props.theme.gridGap};
  grid-template-columns: 2fr 1fr;

  padding: 2rem 0;

  height: 100%;
`;

export default function MapGrid({ children }) {
  return <GridContainer>{children}</GridContainer>;
}

MapGrid.propTypes = {
  children: PropTypes.node,
};

import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Grid from "./Grid";

const GridContainer = styled(Grid)`
  height: 100%;
`;

export default function MapGrid(props) {
  return <GridContainer>{props.children}</GridContainer>;
}

MapGrid.propTypes = {
  children: PropTypes.node,
};

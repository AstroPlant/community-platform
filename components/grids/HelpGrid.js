import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Grid from "./Grid";

const GridContainer = styled(Grid)`
  && {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
`;

export default function HelpGrid(props) {
  return (
    <GridContainer fillHeight className={props.className}>
      {props.children}
    </GridContainer>
  );
}

HelpGrid.propTypes = {
  /* attribute to edit the component style using styled-component */
  className: PropTypes.string,
  /* Node children of the component */
  children: PropTypes.node,
};

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const GridContainer = styled.div`
  display: grid;
  grid-gap: ${(props) => props.theme.gridGap};
  grid-template-columns: ${(props) => (props.inverted ? "1fr 2fr" : "2fr 1fr")};

  padding: 2rem 0;

  height: ${(props) => props.fillHeight && "100%"};

  @media screen and (max-width: 1024px) {
    grid-template-columns: unset;
    grid-auto-flow: dense;
  }
`;

export default function Grid(props) {
  return (
    <GridContainer
      fillHeight={props.fillHeight}
      inverted={props.inverted}
      className={props.className}
      {...props}
    >
      {props.children}
    </GridContainer>
  );
}

Grid.propTypes = {
  /* Content of the grid */
  children: PropTypes.node.isRequired,
  /* Whether or not the classic ratio of 2/3 1/3 should be inverted to 1/3 2/3 */
  inverted: PropTypes.bool,
  /* Makes the grid fill it's container's height */
  fillHeight: PropTypes.bool,
};

Grid.defaultProps = {
  inverted: false,
  fillHeight: false,
};

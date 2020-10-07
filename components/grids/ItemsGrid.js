import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Breaks from "../../utils/breakpoints";
import Grid from "./Grid";

const EmptyGrid = styled.div`
  padding: 2rem 0;
`;

const GridContainer = styled(Grid)`
  && {
    grid-template-columns: repeat(${(props) => props.columns}, 1fr);

    @media screen and (max-width: ${Breaks.large}) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: ${Breaks.medium}) {
      grid-template-columns: unset;
    }
  }
`;

export default function ItemsGrid({ className, children, columns }) {
  return (
    <>
      {children.length === 0 ? (
        <EmptyGrid>
          <p>No items were found.</p>
        </EmptyGrid>
      ) : (
        <GridContainer fillHeight className={className} columns={columns}>
          {children}
        </GridContainer>
      )}
    </>
  );
}

ItemsGrid.propTypes = {
  /**
   * attribute to edit the component style using styled-component
   */
  className: PropTypes.string,
  /**
   * Content of the grid
   */
  children: PropTypes.node,
  /**
   * Number of columns of the grid
   */
  columns: PropTypes.number,
};

ItemsGrid.defaultProps = {
  columns: 3,
};

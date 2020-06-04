import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
`;

const GridContainer = styled.div`
  display: grid;
  grid-gap: ${(props) => props.theme.gridGap};
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);

  padding: 2rem 0;
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-gap: ${(props) => props.theme.gridGap};
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(1, 1fr);

  padding: 2rem 0;
`;

const FeaturedArticle = styled.div`
  grid-row: 1;
  grid-column: 1 / span 3;
`;

export default function ArticleGrid({ children }) {
  const allChildren = React.Children.toArray(children);
  const featured = allChildren[0];
  allChildren.shift();
  const otherChildren = allChildren;
  return (
    <Container>
      <FeaturedGrid>
        <FeaturedArticle>{featured}</FeaturedArticle>
      </FeaturedGrid>
      <GridContainer>{otherChildren}</GridContainer>
    </Container>
  );
}

ArticleGrid.propTypes = {
  children: PropTypes.node,
};

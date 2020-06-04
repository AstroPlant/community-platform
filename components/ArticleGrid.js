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
  grid-template-rows: repeat(4, 1fr);

  padding: 2rem 0;
`;

const GridItem = styled.div`
  height: 30vh;
`;

const FeaturedArticle = styled.div`
  margin: 2rem 0;
  grid-row: 1;
  grid-column: 1 / span 3;
  height: 50vh;
`;

export default function ArticleGrid({ children }) {
  const allChildren = React.Children.toArray(children);
  const featured = allChildren[0];
  allChildren.shift();
  const otherChildren = allChildren;
  return (
    <Container>
      <FeaturedArticle>{featured}</FeaturedArticle>
      <GridContainer>
        {otherChildren.map((child) => (
          <GridItem>{child}</GridItem>
        ))}
      </GridContainer>
    </Container>
  );
}

ArticleGrid.propTypes = {
  children: PropTypes.node,
};

import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import FeaturedArticleCard from "../cards/FeaturedArticleCard";
import NewsCard from "../cards/NewsCard";

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

const GridItem = styled.div`
  height: 30vh;
`;

const FeaturedArticleContainer = styled.div`
  margin: 2rem 0;
  grid-row: 1;
  grid-column: 1 / span 3;
  height: 50vh;
`;

export default function ArticleGrid({ articles }) {
  const featured = articles[0];
  let otherArticles = [];
  for (let i = 1; i < articles.length; i++) {
    otherArticles.push(articles[i]);
  }

  return (
    <Container>
      <FeaturedArticleContainer>
        <FeaturedArticleCard
          featuredArticle={featured}
          href={"/news/[slug]"}
          as={"/news/" + featured.slug}
        />
      </FeaturedArticleContainer>
      <GridContainer>
        {otherArticles.map((anArticle) => (
          <GridItem key={anArticle.id}>
            <NewsCard
              article={anArticle}
              href={"/news/[slug]"}
              as={"/news/" + anArticle.slug}
            />
          </GridItem>
        ))}
      </GridContainer>
    </Container>
  );
}

ArticleGrid.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

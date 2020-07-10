import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import FeaturedArticleCard from "../cards/FeaturedArticleCard";
import NewsCard from "../cards/NewsCard";
import Grid from "./Grid";

const FeaturedArticleContainer = styled.div`
  height: 50vh;
  margin: 2rem 0;
`;

const GridContainer = styled(Grid)`
  && {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const GridItem = styled.div`
  height: 30vh;
`;

export default function ArticleGrid({ articles }) {
  const featured = articles[0];
  let otherArticles = [];
  for (let i = 1; i < articles.length; i++) {
    otherArticles.push(articles[i]);
  }

  return (
    <>
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
            <NewsCard featuredArticle={anArticle} />
          </GridItem>
        ))}
      </GridContainer>
    </>
  );
}

ArticleGrid.propTypes = {
  /* Array of articles */
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

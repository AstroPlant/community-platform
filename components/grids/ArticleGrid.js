import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import ArticleCard from "../cards/ArticleCard";
import Grid from "./Grid";

const GridContainer = styled(Grid)`
  && {
    grid-template-columns: repeat(3, 1fr);

    @media screen and (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 864px) {
      grid-template-columns: unset;
    }
  }
`;

export default function ArticleGrid(props) {
  return (
    <GridContainer>
      {props.articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </GridContainer>
  );
}

ArticleGrid.propTypes = {
  /* Array of articles */
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

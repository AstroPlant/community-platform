import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import ArticleGrid from "./grids/ArticleGrid";
import FAQGrid from "./grids/FAQGrid";
import MediasGrid from "./grids/MediasGrid";

const Container = styled.div`
  padding: 2rem 0;
`;

const ResultsDescription = styled.h3`
  font-size: 1.25rem;
  font-weight: 300;
  font-style: italic;
`;

export default function SearchResults(props) {
  return (
    <Container>
      <ResultsDescription>{`Search for "${props.params.query}" has ${props.results.length} results`}</ResultsDescription>
      {props.resultsType === "libraryMedias" && (
        <MediasGrid medias={props.results} />
      )}
      {props.resultsType === "faqs" && <FAQGrid faqs={props.results} />}
      {props.resultsType === "articles" && (
        <ArticleGrid articles={props.results} />
      )}
    </Container>
  );
}

SearchResults.propTypes = {
  /**
   * object containing the parameters used for the search
   */
  params: PropTypes.object.isRequired,
  /**
   * the results of the search
   */
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * the type of the result to display
   */
  resultsType: PropTypes.string.isRequired,
};

import PropTypes from "prop-types";
import React, { useRef } from "react";
import styled from "styled-components";
import Breaks from "../utils/breakpoints";
import ArticleCard from "./cards/ArticleCard";
import LibraryMediaCard from "./cards/LibraryMediaCard";
import UserCard from "./cards/UserCard";
import FAQGrid from "./grids/FAQGrid";
import Grid from "./grids/Grid";
import ItemsGrid from "./grids/ItemsGrid";

const ResultsContainer = styled.div`
  padding: 0.5rem 1rem 0 0;

  max-height: ${(props) => `calc(100vh - ${props.pos}px)`};

  overflow-y: scroll;

  @media screen and (max-width: ${Breaks.medium}) {
    max-height: unset;
    overflow-y: auto;
  }
`;

const ResultDescription = styled.h3`
  font-style: italic;
  font-weight: 300;

  margin-bottom: 1rem;
`;

const ResultsGrid = styled(ItemsGrid)`
  && {
    grid-template-rows: unset;
  }
`;

const UserGrid = styled(Grid)`
  && {
    grid-template-columns: 1fr;
  }
`;

export default function SearchResults({ results, params, activeFilter }) {
  const resultsRef = useRef(null);

  return (
    <div>
      <ResultDescription>Results for "{params.query}"</ResultDescription>
      <div ref={resultsRef}>
        <ResultsContainer
          pos={resultsRef.current && resultsRef.current.offsetTop + 64}
        >
          {activeFilter === "All" && (
            <>
              <h4>News</h4>
              <ResultsGrid>
                {results.news.map((article) => (
                  <ArticleCard
                    showCover={false}
                    key={article.id}
                    article={article}
                  />
                ))}
              </ResultsGrid>
              <h4>Frequently Asked Questions (FAQs)</h4>
              <FAQGrid faqs={results.faqs} />
              <h4>Library Medias</h4>
              <ResultsGrid>
                {results.medias.map((media) => (
                  <LibraryMediaCard key={media.id} media={media} />
                ))}
              </ResultsGrid>
              <h4>Space Farmers</h4>
              <UserGrid>
                {results.users.map((user) => (
                  <UserCard key={user.username} user={user} />
                ))}
              </UserGrid>
            </>
          )}
          {activeFilter === "news" && (
            <>
              <h4>News</h4>
              <ResultsGrid>
                {results.news.map((article) => (
                  <ArticleCard
                    showCover={false}
                    key={article.id}
                    article={article}
                  />
                ))}
              </ResultsGrid>
            </>
          )}
          {activeFilter === "medias" && (
            <>
              <h4>Library Medias</h4>
              <ResultsGrid>
                {results.medias.map((media) => (
                  <LibraryMediaCard key={media.id} media={media} />
                ))}
              </ResultsGrid>
            </>
          )}
          {activeFilter === "faqs" && (
            <>
              <h4>Frequently Asked Questions (FAQs)</h4>
              <FAQGrid faqs={results.faqs} />
            </>
          )}
          {activeFilter === "users" && (
            <>
              <h4>Users</h4>
              <UserGrid>
                {results.users.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </UserGrid>
            </>
          )}
        </ResultsContainer>
      </div>
    </div>
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
  results: PropTypes.object.isRequired,
};

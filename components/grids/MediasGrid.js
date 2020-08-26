import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Breaks from "../../utils/breakpoints";
import LibraryMediaCard from "../cards/LibraryMediaCard";
import Grid from "./Grid";

const EmptyGrid = styled.div`
  padding: 2rem 0;
`;

const Container = styled(Grid)`
  && {
    grid-template-columns: repeat(3, 1fr);

    @media screen and (max-width: ${Breaks.large}) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: ${Breaks.medium}) {
      grid-template-columns: unset;
    }
  }

  width: 100%;
`;

export default function MediasGrid({ medias }) {
  return (
    <>
      {medias.length === 0 ? (
        <EmptyGrid>
          <p>No medias were found.</p>
        </EmptyGrid>
      ) : (
        <Container>
          {medias.map((media) => (
            <LibraryMediaCard key={media.id} media={media} />
          ))}
        </Container>
      )}
    </>
  );
}

MediasGrid.propTypes = {
  /* Array containing the medias objects */
  medias: PropTypes.arrayOf(PropTypes.object).isRequired,
};

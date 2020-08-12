import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import LibraryMediaCard from "../cards/LibraryMediaCard";
import LibrarySectionCard from "../cards/LibrarySectionCard";
import Grid from "./Grid";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  height: 100%;
`;

const SectionGrid = styled(Grid)`
  && {
    grid-template-columns: 1fr 3fr;

    @media screen and (max-width: 768px) {
      grid-template-columns: unset;
    }
  }

  width: 100%;
`;

const FeaturedMediaGrid = styled(Grid)`
  && {
    grid-template-columns: 1fr 1fr 1fr;

    width: 100%;

    padding: 0;

    @media screen and (max-width: 1024px) {
      grid-template-columns: unset;
      grid-template-rows: 1fr 1fr 1fr;
    }

    @media screen and (max-width: 768px) {
      display: none;
    }
  }
`;

export default function LibraryGrid(props) {
  return (
    <Container>
      {props.librarySections.map((section) => (
        <SectionGrid key={section.id}>
          <LibrarySectionCard
            librarySection={section}
            mediaCount={section.all_medias.length}
          />
          <FeaturedMediaGrid>
            {section.featured_medias.map((media) => (
              <LibraryMediaCard key={media.id} media={media} />
            ))}
          </FeaturedMediaGrid>
        </SectionGrid>
      ))}
    </Container>
  );
}

LibraryGrid.propTypes = {
  /* Array containing the library sections objects */
  librarySections: PropTypes.arrayOf(PropTypes.object).isRequired,
};

import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Breaks from "../../utils/breakpoints";
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

    @media screen and (max-width: ${Breaks.large}) {
      grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: ${Breaks.medium}) {
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

    @media screen and (max-width: ${Breaks.large}) {
      grid-template-columns: unset;
    }

    @media screen and (max-width: ${Breaks.medium}) {
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
            mediaCount={section.library_medias_count}
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

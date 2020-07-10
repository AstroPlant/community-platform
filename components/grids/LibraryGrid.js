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
    grid-template-columns: repeat(3, 1fr);
  }

  width: 100%;
`;

const MediaGrid = styled(Grid)`
  && {
    grid-template-columns: repeat(6, 1fr);
  }

  width: 100%;
`;

const SubTitle = styled.h2`
  margin: 1rem 0;
`;

export default function LibraryGrid(props) {
  return (
    <Container>
      <SectionGrid>
        {props.librarySections.map((section) => (
          <LibrarySectionCard
            key={section.id}
            librarySection={section}
            href={"/library/[slug]"}
            as={`/library/${section.slug}`}
          />
        ))}
      </SectionGrid>

      <SubTitle>Featured Media</SubTitle>

      <MediaGrid>
        {props.featuredMedias.map((media) => (
          <LibraryMediaCard key={media.id} media={media} />
        ))}
      </MediaGrid>
    </Container>
  );
}

LibraryGrid.propTypes = {
  /* Array containing the featured medias objects */
  featuredMedias: PropTypes.arrayOf(PropTypes.object).isRequired,
  /* Array containing the library sections objects */
  librarySections: PropTypes.arrayOf(PropTypes.object).isRequired,
};

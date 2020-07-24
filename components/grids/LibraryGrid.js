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
    grid-template-columns: repeat(4, 1fr);
  }

  width: 100%;
`;

export default function LibraryGrid(props) {
  return (
    <Container>
      {props.librarySections.map((section) => (
        <SectionGrid key={section.id}>
          <LibrarySectionCard
            librarySection={section}
            mediaCount={section.all_medias.length}
            href={"/library/[slug]"}
            as={`/library/${section.slug}`}
          />
          {section.featured_medias.map((media) => (
            <LibraryMediaCard key={media.id} media={media} />
          ))}
        </SectionGrid>
      ))}
    </Container>
  );
}

LibraryGrid.propTypes = {
  /* Array containing the library sections objects */
  librarySections: PropTypes.arrayOf(PropTypes.object).isRequired,
};

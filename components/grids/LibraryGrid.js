import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import LibrarySectionCard from "../cards/LibrarySectionCard";
import LibraryMediaCard from "../cards/LibraryMediaCard";

const Container = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  padding: 2rem 0;
`;

const SectionGrid = styled.div`
  display: grid;
  grid-gap: ${(props) => props.theme.gridGap};
  grid-template-columns: repeat(3, 1fr);

  width: 100%;
`;

const MediaGrid = styled.div`
  display: grid;
  grid-gap: ${(props) => props.theme.gridGap};
  grid-template-columns: repeat(6, 1fr);

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
  featuredMedias: PropTypes.arrayOf(PropTypes.object).isRequired,
  librarySections: PropTypes.arrayOf(PropTypes.object).isRequired,
};

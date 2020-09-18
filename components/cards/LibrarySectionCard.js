import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Button from "../Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  min-height: 340px;
`;

const Subtitle = styled.h4`
  color: ${(props) => props.theme.primary};
  font-weight: 300;
  font-style: italic;
`;

const Description = styled.p`
  width: 100%;
  max-width: 448px;
  line-height: 1.35em;
  height: 4.05em;
  margin: 1rem 0;
`;

const ExploreButton = styled(Button)`
  && {
    margin: auto 0 0 0;
    width: 100%;
  }
`;

export default function LibrarySectionCard({
  className,
  mediaCount,
  librarySection,
}) {
  return (
    <Container className={className}>
      <h3>{librarySection.title}</h3>
      <Subtitle>{mediaCount} item(s)</Subtitle>
      <Description>{librarySection.description}</Description>
      <Link href={"/library/[slug]"} as={`/library/${librarySection.slug}`}>
        <ExploreButton color={"primary"} label={"Explore"} />
      </Link>
    </Container>
  );
}

LibrarySectionCard.propTypes = {
  /**
   * Object containing the section information
   */
  librarySection: PropTypes.object.isRequired,
  /**
   * Total number of medias in the section
   */
  mediaCount: PropTypes.number.isRequired,
};

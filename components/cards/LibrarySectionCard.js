import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import WrapInLink from "../WrapInLink";
import Card from "./Card";

const Container = styled(Card)`
  flex-direction: column;
  align-items: center;
  justify-content: center;

  && {
    text-align: center;

    min-height: 340px;
  }
`;

const Subtitle = styled.b`
  color: ${(props) => props.theme.primary};
  margin: 0.75rem 0 0 0;
`;

const Description = styled.p`
  width: 100%;
  max-width: 448px;

  margin: 1rem 0 0 0;
`;

export default function LibrarySectionCard({
  className,
  mediaCount,
  librarySection,
}) {
  return (
    <WrapInLink href={"/library/[slug]"} as={`/library/${librarySection.slug}`}>
      <Container animateOnHover className={className}>
        <h3>{librarySection.title}</h3>
        <Subtitle>{mediaCount} item(s)</Subtitle>
        <Description>{librarySection.description}</Description>
      </Container>
    </WrapInLink>
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

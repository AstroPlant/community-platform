import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Button from "../Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flext-start;
`;

const Subtitle = styled.h4`
  color: ${(props) => props.theme.primary};
  font-weight: 300;
  font-style: italic;
`;

const Description = styled.p`
  width: 100%;
  margin: 1rem 0;
`;

const AlignBottomButton = styled(Button)`
  && {
    margin: auto 0 0 0;
  }
`;

export default function LibrarySectionCard(props) {
  return (
    <Container className={props.className}>
      <h3>{props.librarySection.title}</h3>
      <Subtitle>{props.mediaCount} medias</Subtitle>
      <Description>{props.librarySection.description}</Description>
      <Link
        href={"/library/[slug]"}
        as={`/library/${props.librarySection.slug}`}
      >
        <AlignBottomButton color={"primary"} label={"Explore"} />
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

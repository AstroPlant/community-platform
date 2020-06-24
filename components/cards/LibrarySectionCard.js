import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import WrapInLink from "../WrapInLink";
import Card from "./Card";

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
`;

const Description = styled.div`
  width: 100%;
  margin: 1rem 0;

  text-align: center;
`;

export default function LibrarySectionCard(props) {
  return (
    <WrapInLink href={props.href} as={props.as}>
      <Container className={props.className}>
        <h3>{props.librarySection.title}</h3>
        <Description>{props.librarySection.description}</Description>
      </Container>
    </WrapInLink>
  );
}

LibrarySectionCard.propTypes = {
  librarySection: PropTypes.object.isRequired,
};

import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Card from "./Card";

const Container = styled(Card)`
  && {
    margin-bottom: 1rem;
    height: min-content;
  }

  flex-direction: column;
`;

const Headline = styled.h4`
  margin: 0 0 1rem 0;
`;

export default function InformationCard({ className, headline, details }) {
  return (
    <Container className={className}>
      <Headline>{headline}</Headline>
      <p>{details}</p>
    </Container>
  );
}

InformationCard.propTypes = {
  /**
   * headline of the information
   */
  headline: PropTypes.string,
  /**
   * details of hte information
   */
  details: PropTypes.string,
};

InformationCard.defaultProps = {
  headline: null,
  details: null,
};

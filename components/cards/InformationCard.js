import PropTypes from "prop-types";
import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Card from "./Card";
import Button from "../Button";

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

export default function InformationCard({ className, headline, details, serial }) {
  return (
    <>
      <Container className={className}>
        <Headline>{headline}</Headline>
        <p>{details}</p>
      </Container>
      {serial ? <Link href={"/kit/" + serial}>
        <Button label={"Go to kit page"} />
      </Link> : null}
    </>
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
  /**
   * Serial of the kit
   */
  serial: PropTypes.string
};

InformationCard.defaultProps = {
  headline: null,
  details: null,
};

import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Breaks from "../../utils/breakpoints";
import WrapInLink from "../WrapInLink";
import Card from "./Card";

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  min-height: 300px;

  @media screen and (max-width: ${Breaks.medium}) {
    min-height: 180px;
  }
`;

export default function HelpSectionCard(props) {
  return (
    <WrapInLink href="/help/[slug]" as={`/help/${props.helpSection.slug}`}>
      <Container animateOnHover className={props.className}>
        <h3>{props.helpSection.title}</h3>
      </Container>
    </WrapInLink>
  );
}

HelpSectionCard.propTypes = {
  /**
   * Styling class of the container. Used by styled-components.
   */
  className: PropTypes.string,
  /**
   * Object containing the help section information
   */
  helpSection: PropTypes.object.isRequired,
};

import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Icon from "../Icon";
import WrapInLink from "../WrapInLink";
import Card from "./Card";

const Container = styled(Card)`
  align-items: center;
  justify-content: center;
`;

const ContentRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconHolder = styled(Icon)`
  transition: fill 0.2s ease-out;

  ${Container}:hover & {
    fill: ${(props) => props.theme.primary} !important;
  }
`;

const CardTitle = styled.h3`
  width: min-content;
`;

export function PureCard(props) {
  return (
    <Container animateOnHover className={props.className}>
      <ContentRow>
        <IconHolder color={"light"} size={props.iconSize}>
          {props.iconSVG}
        </IconHolder>
        <CardTitle>{props.title}</CardTitle>
      </ContentRow>
    </Container>
  );
}

export default function HelpCard(props) {
  const external = props.href.includes("http");
  return (
    <>
      {external ? (
        <a href={props.href} target="_blank" rel="noopener">
          <PureCard {...props} />
        </a>
      ) : (
        <WrapInLink href={props.href}>
          <PureCard {...props} />
        </WrapInLink>
      )}
    </>
  );
}

HelpCard.propTypes = {
  /**
   * Styling class of the container. Used by styled-components.
   */
  className: PropTypes.string,
  /**
   * The size of the icon in pixels
   */
  iconSize: PropTypes.number.isRequired,
  /**
   * React component imported from the svgr webpack
   */
  iconSVG: PropTypes.node.isRequired,
  /**
   * Title displayed on the card next to the icon
   */
  title: PropTypes.string.isRequired,
  /**
   * Destination to reach when clicking on the card
   */
  href: PropTypes.string,
};

HelpCard.defaultProps = {
  href: "/",
};

import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Breaks from "../../utils/breakpoints";
import Icon from "../Icon";
import WrapInLink from "../WrapInLink";
import Card from "./Card";

const Container = styled(Card)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const TitleRow = styled.div`
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

const Title = styled.h3`
  margin: 0 0 0 1rem;
  color: ${props => props.theme.primary};

  transition: color 0.2s ease-out;

  ${Container}:hover & {
    color: ${(props) => props.theme.primary};
  }

  @media screen and (max-width: ${Breaks.medium}) {
    width: min-content;
  }
`;

const Description = styled.p`
  margin: 1rem 0;
  max-width: 520px;
`;

export default function DashboardLinkCard({ href, icon, title, description }) {
  return (
    <WrapInLink href={href}>
      <Container animateOnHover>
        <TitleRow>
          <IconHolder size={48} color={"primary"}>
            {icon}
          </IconHolder>
          <Title>{title}</Title>
        </TitleRow>
        <Description>{description}</Description>
      </Container>
    </WrapInLink>
  );
}

DashboardLinkCard.propTypes = {
  /**
   * Destination of the link
   */
  href: PropTypes.string.isRequired,
  /**
   * Icon to use
   */
  icon: PropTypes.node.isRequired,
  /**
   * Title of the card
   */
  title: PropTypes.string.isRequired,
  /**
   * Description of the card destination
   */
  description: PropTypes.string.isRequired,
};

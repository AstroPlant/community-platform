import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import KitIcon from "../../public/icons/kit.svg";
import Icon from "../Icon";
import Card from "./Card";

const Container = styled(Card)`
  && {
    margin-bottom: 1.5rem;
    padding: 1rem 1.5rem;
    background-color: ${(props) => props.theme.dark};
    height: min-content;
  }

  align-items: center;
`;

const IconHolder = styled(Icon)`
  && {
    padding: 0.25rem;
    margin: 0 0.5rem 0 0;

    border-radius: ${(props) => props.theme.radiusMin};
    background-color: ${(props) => props.theme.primary};

    cursor: default;
  }
`;

const DetailsHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  margin: 0 0 0 1rem;
`;

const KitName = styled.b`
  font-size: 20px;
`;

export default function KitMembershipCard({ className, membership }) {
  const kit = membership.kit;
  return (
    <Container className={className}>
      <IconHolder color={"dark"} size={48}>
        <KitIcon />
      </IconHolder>
      <DetailsHolder>
        <KitName>{kit.name}</KitName>
        <p>{kit.serial}</p>
      </DetailsHolder>
    </Container>
  );
}

KitMembershipCard.propTypes = {
  /**
   * Object containing the membership details
   */
  membership: PropTypes.object.isRequired,
};

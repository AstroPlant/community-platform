import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Button from "../Button";
import WrapInLink from "../WrapInLink";
import Card from "./Card";

const Container = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const InfoHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export default function KitMembershipCard(props) {
  const kit = props.membership.kit;
  return (
    <Container>
      <InfoHolder>
        <h3>{kit.name}</h3>
        <p>{kit.serial}</p>
      </InfoHolder>
      <WrapInLink passHref href={"/kits/[serial]"} as={`/kits/${kit.serial}`}>
        <Button color={"primary"} label={"Inspect"} />
      </WrapInLink>
    </Container>
  );
}

KitMembershipCard.propTypes = {
  /* Object containing the membership inforamtion */
  membership: PropTypes.object.isRequired,
};

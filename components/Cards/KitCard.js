import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Button from "../Button";
import Card from "./Card";

const Container = styled(Card)`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: flex-start;

  text-align: start;
`;

const TitleRow = styled.div`
  flex: 1;

  display: flex;
  align-items: flex-end;
`;

const KitName = styled.h2`
  margin-right: 2rem;
`;

const KitType = styled.i`
  line-height: 32px;
`;

const KitDataContainer = styled.div`
  flex: 7;

  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 100%;
  width: 100%;
  padding: 1rem 0;
`;

const KitSensor = styled.div`
  display: block;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  background-color: white;
`;

const ButtonRow = styled.div`
  flex: 1;
  width: 100%;
`;

const ShowAllButton = styled(Button)`
  && {
    margin: auto;
  }
`;

export default function KitCard({ className, kitName, kitType }) {
  return (
    <Container className={className}>
      <TitleRow>
        <KitName>{kitName}</KitName>
        <KitType>{kitType}</KitType>
      </TitleRow>

      <KitDataContainer>
        <KitSensor />
        <KitSensor />
        <KitSensor />
        <KitSensor />
        <KitSensor />
      </KitDataContainer>

      <ButtonRow>
        <ShowAllButton label={"Show All"} color={"#56F265"}></ShowAllButton>
      </ButtonRow>
    </Container>
  );
}

KitCard.propTypes = {
  className: PropTypes.string,
  kitName: PropTypes.string.isRequired,
  kitType: PropTypes.string.isRequired,
};

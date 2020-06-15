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
  justify-content: space-evenly;

  height: 100%;
  width: 100%;
  padding: 1rem 0;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const KitSensor = styled.div`
  display: block;
  height: 75px;
  width: 75px;
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

export default function KitCard({ className, kit }) {
  const isEmpty = !Object.keys(kit).length;

  return (
    <Container className={className}>
      {!isEmpty ? (
        <>
          <TitleRow>
            <KitName>{kit.name}</KitName>
            <KitType>{kit.serial}</KitType>
          </TitleRow>

          <KitDataContainer>
            {kit.config.peripherals.map((peripheral) => (
              <Column>
                <KitSensor />
                <p>{peripheral.details.className}</p>
              </Column>
            ))}
          </KitDataContainer>

          <ButtonRow>
            <ShowAllButton label={"Show All"} color={"#56F265"} />
          </ButtonRow>
        </>
      ) : (
        <>
          <p>No kits.</p>
          <ShowAllButton label={"Add a kit."} color={"#56F265"} />
        </>
      )}
    </Container>
  );
}

KitCard.propTypes = {
  className: PropTypes.string,
  kits: PropTypes.arrayOf(PropTypes.object).isRequired,
};

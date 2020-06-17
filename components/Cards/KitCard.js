import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Button from "../Button";
import LivePeripheral from "../LivePeripheral";
import WrapInLink from "../WrapInLink";
import Card from "./Card";

const Container = styled(Card)`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: flex-start;

  text-align: start;
`;

const TitleRow = styled.div`
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
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  height: 100%;
  width: 100%;
  padding: 1rem 0;
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

export default function KitCard({ className, kit, home }) {
  const isEmpty = !Object.keys(kit).length;

  return (
    <Container className={className}>
      {!isEmpty ? (
        <>
          {home ? (
            <TitleRow>
              <KitName>{kit.name}</KitName>
              <KitType>{kit.serial}</KitType>
            </TitleRow>
          ) : (
            <></>
          )}

          <KitDataContainer>
            {kit.config.peripherals.map((peripheral) => {
              const isSensor =
                peripheral.details.expectedQuantityTypes.length !== 0;
              if (isSensor) {
                return (
                  <LivePeripheral key={peripheral.id} peripheral={peripheral} />
                );
              }
            })}
          </KitDataContainer>

          {home && (
            <ButtonRow>
              <WrapInLink passHref href={"/kits"}>
                <ShowAllButton label={"Show All"} color={"#56F265"} />
              </WrapInLink>
            </ButtonRow>
          )}
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
  kit: PropTypes.object.isRequired,
};

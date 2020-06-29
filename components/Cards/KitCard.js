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
  align-items: ${(props) => (props.isEmpty ? "center" : "flex-start")};
  justify-content: ${(props) => (props.isEmpty ? "center" : "flex-start")};

  text-align: ${(props) => (props.isEmpty ? "center" : "start")};
`;

const TitleRow = styled.div`
  display: flex;
  align-items: flex-end;
`;

const KitName = styled.h3`
  margin-right: 2rem;
`;

const KitType = styled.i`
  line-height: 32px;
`;

const KitSensorsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  height: 100%;
  width: 100%;

  margin: auto;
  padding: 1rem 0;
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const MarginButton = styled(Button)`
  && {
    margin: 0 1rem;
  }
`;

const NoKitsMessage = styled.p`
  margin: 1rem 0;
`;

export default function KitCard({ className, kit, home }) {
  const isEmpty = !Object.keys(kit).length;

  return (
    <Container isEmpty={isEmpty} className={className}>
      {!isEmpty ? (
        <>
          {home && (
            <TitleRow>
              <KitName>{kit.name}</KitName>
              <KitType>{kit.serial}</KitType>
            </TitleRow>
          )}

          <KitSensorsRow>
            {kit.config.peripherals.map((peripheral) => {
              const isSensor =
                peripheral.details.expectedQuantityTypes.length !== 0;
              if (isSensor) {
                return (
                  <LivePeripheral key={peripheral.id} peripheral={peripheral} />
                );
              }
            })}
          </KitSensorsRow>

          {home && (
            <ButtonRow>
              <WrapInLink
                passHref
                href={"/kits/[serial]"}
                as={`/kits/${kit.serial}`}
              >
                <MarginButton inverted label={"Inspect Kit"} color={"dark"} />
              </WrapInLink>
              <WrapInLink passHref href={"/kits"}>
                <MarginButton label={"All My Kits"} color={"primary"} />
              </WrapInLink>
            </ButtonRow>
          )}
        </>
      ) : (
        <>
          <NoKitsMessage>You are not the member of any kits! :(</NoKitsMessage>
          <MarginButton label={"Add a kit."} color={"primary"} />
        </>
      )}
    </Container>
  );
}

KitCard.propTypes = {
  className: PropTypes.string,
  kit: PropTypes.object.isRequired,
};

import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { useAuth } from "../../providers/Auth";
import Button from "../Button";
import LivePeripheral from "../LivePeripheral";
import Card from "./Card";

const Container = styled(Card)`
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

export default function KitCard(props) {
  const { isLogged } = useAuth();

  const isEmpty = !Object.keys(props.kit).length;

  return (
    <Container isEmpty={isEmpty} className={props.className}>
      {isLogged ? (
        <>
          {!isEmpty ? (
            <>
              {props.home && (
                <TitleRow>
                  <KitName>{props.kit.name}</KitName>
                  <KitType>{props.kit.serial}</KitType>
                </TitleRow>
              )}

              <KitSensorsRow>
                {props.kit.config.peripherals.map((peripheral) => {
                  const isSensor =
                    peripheral.details.expectedQuantityTypes.length !== 0;
                  if (isSensor) {
                    return (
                      <LivePeripheral
                        key={peripheral.id}
                        peripheral={peripheral}
                      />
                    );
                  }
                })}
              </KitSensorsRow>

              {props.home && (
                <ButtonRow>
                  <Link
                    passHref
                    href={"/kits/[serial]"}
                    as={`/kits/${props.kit.serial}`}
                  >
                    <MarginButton
                      inverted
                      label={"Inspect Kit"}
                      color={"dark"}
                    />
                  </Link>
                  <Link passHref href={"/kits"}>
                    <MarginButton label={"All My Kits"} color={"primary"} />
                  </Link>
                </ButtonRow>
              )}
            </>
          ) : (
            <>
              <NoKitsMessage>
                You are not the member of any kits! :(
              </NoKitsMessage>
              <MarginButton label={"Add a kit."} color={"primary"} />
            </>
          )}
        </>
      ) : (
        <>
          <NoKitsMessage>Login to see your kits data.</NoKitsMessage>
          <Link passHref href="/login">
            <Button label={"Login"} color={"primary"} />
          </Link>
        </>
      )}
    </Container>
  );
}

KitCard.propTypes = {
  className: PropTypes.string,
  /* Object containing the kit information to display */
  kit: PropTypes.object.isRequired,
  /* Whether or not the card is displayed on the home page  */
  home: PropTypes.bool.isRequired,
};

KitCard.defaultProps = {
  home: false,
};

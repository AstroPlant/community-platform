import React from "react";
import styled from "styled-components";
import Theme from "../../styles/theme";
import Button from "../Button";
import InProgress from "../InProgress";
import Card from "./Card";
import PeripheralCard from "./PeripheralCard";
import Link from "next/link";

const Container = styled(Card)`
  flex-flow: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Details = styled.p`
  max-width: 384px;

  a {
    font-weight: bold;
    color: ${(props) => props.theme.primary};
  }
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 1.5rem;
`;

const PeripheralCardsContainer = styled.div`
  align-self: flex-start;
  display: grid;
  gap: 1.5rem;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr) );
`;

export default function KitCard(props) {

  if (props.kit) {
    return (
      <Container {...props}>

        <TopContainer>
          <h3>{props.kit.name}</h3>
          <Link passHref href={`/dashboard/${props.kit.serial}`}>
            <Button color={"secondary"} inverted label="Open dashboard" />
          </Link>
        </TopContainer>

        <PeripheralCardsContainer>
          {props.kit.config?.peripherals?.map(peripheral => {
            peripheral.measures = props.kit.measures?.measures?.filter(measure => measure.peripheralId === peripheral.id);
            return peripheral.details.expectedQuantityTypes?.map((quantityType, i) => {
              return <PeripheralCard key={i} color={Theme.dark} peripheral={peripheral} expectedQuantityType={quantityType} />
            })
          })}
        </PeripheralCardsContainer>

      </Container>
    )
  }

  return (
    <Container {...props}>
      <InProgress title="Kit Dashboards" />
      <Details>
        You don't have a kit yet.{" "}
        To learn more about the kits
        please{" "}
        <a href="http://astroplant.slack.com/" target="_blank" rel="noopener">
          join our Slack
        </a>
        .
      </Details>
    </Container>
  );
}

KitCard.propTypes = {};
KitCard.defaultProps = {};

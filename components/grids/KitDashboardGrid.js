import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import KitCard from "../cards/KitCard";
import KitInformationCard from "../cards/KitInformationCard";
import KitToolCard from "../cards/KitToolCard";
import SidepanelSection from "../SidepanelSection";

const GridContainer = styled.div`
  display: grid;
  grid-gap: ${(props) => props.theme.gridGap};
  grid-template-columns: 2fr 1fr;

  padding: 2rem 0;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
`;

const ColumnItem = styled.div`
  width: 100%;
`;

const ListTitle = styled.h5`
  margin-bottom: 0.5rem;
`;

export default function KitDashboardGrid(props) {
  const collabs = [
    { id: 1, displayName: "Arthur Dent" },
    { id: 2, displayName: "Ford Prefect" },
    { id: 3, displayName: "Zaphod Beeblebrox" },
    { id: 4, displayName: "Marvin the Paranoid Android" },
    { id: 5, displayName: "Slartibartfast" },
  ];

  return (
    <GridContainer>
      <Column>
        <ColumnItem>
          <KitCard kit={props.kit} />
        </ColumnItem>
      </Column>
      <Column>
        <SidepanelSection title={"Information"}>
          <KitInformationCard title={"Growing"} subtitle={"Carrots"} />
          <KitInformationCard
            title={"Current Config"}
            subtitle={props.kit.config.description}
          >
            <ListTitle>Peripherals</ListTitle>
            {props.kit.config.peripherals.map((peripheral) => (
              <p key={peripheral.id}>
                {peripheral.name} - {peripheral.details.brand} -{" "}
                {peripheral.details.model}
              </p>
            ))}
          </KitInformationCard>
          <KitInformationCard title={"Collaborators"}>
            {collabs.map((collaborator) => (
              <p key={collaborator.id}>{collaborator.displayName}</p>
            ))}
          </KitInformationCard>
        </SidepanelSection>
        <SidepanelSection title={"Tools"}>
          <KitToolCard
            title={"Graph Tool"}
            description={"Create a new graph"}
          />
          <KitToolCard
            title={"Graph Tool"}
            description={"Create a new graph"}
          />
          <KitToolCard
            title={"Graph Tool"}
            description={"Create a new graph"}
          />
        </SidepanelSection>
      </Column>
    </GridContainer>
  );
}

KitDashboardGrid.propTypes = {
  kit: PropTypes.object.isRequired,
};

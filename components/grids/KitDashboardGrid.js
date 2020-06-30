import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import GraphCard from "../cards/GraphCard";
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

const ToolsSection = () => {
  return (
    <SidepanelSection title={"Tools"}>
      <KitToolCard title={"Graph Tool"} description={"Create a new graph"} />
      <KitToolCard title={"Graph Tool"} description={"Create a new graph"} />
      <KitToolCard title={"Graph Tool"} description={"Create a new graph"} />
    </SidepanelSection>
  );
};

const InformationSection = ({ config, collaborators }) => {
  return (
    <SidepanelSection title={"Information"}>
      <KitInformationCard title={"Growing"} subtitle={"Carrots"} />
      <KitInformationCard
        title={"Current Config"}
        subtitle={config.description}
      >
        <ListTitle>Peripherals</ListTitle>
        {config.peripherals.map((peripheral) => (
          <p key={peripheral.id}>
            {peripheral.name} - {peripheral.details.brand} -{" "}
            {peripheral.details.model}
          </p>
        ))}
      </KitInformationCard>
      <KitInformationCard title={"Collaborators"}>
        {collaborators.map((collaborator) => (
          <p key={collaborator.id}>{collaborator.displayName}</p>
        ))}
      </KitInformationCard>
    </SidepanelSection>
  );
};

export default function KitDashboardGrid(props) {
  const [currentConfig, setCurrentConfig] = useState(props.kit.config);

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
        <ColumnItem>
          {props.graphs.map((graph) => (
            <GraphCard key={graph.id} graph={graph} />
          ))}
        </ColumnItem>
      </Column>
      <Column>
        <InformationSection config={currentConfig} collaborators={collabs} />
        <ToolsSection />
      </Column>
    </GridContainer>
  );
}

KitDashboardGrid.propTypes = {
  kit: PropTypes.object.isRequired,
  graphs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

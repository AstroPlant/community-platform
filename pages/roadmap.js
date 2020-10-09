import React from "react";
import styled from "styled-components";
import FeatureCard from "../components/cards/FeatureCard";
import ItemsGrid from "../components/grids/ItemsGrid";
import MainLayout from "../components/layouts/MainLayout";
import { getAllFeatures } from "../services/community";
import { REVALIDATION_DELAY } from "../utils/settings";
import useTabs from "../utils/useTabs";

const CardGrid = styled(ItemsGrid)`
  && {
    grid-template-rows: unset;
  }
`;

const TabsHolder = styled.div`
  padding: 1rem 0 0 0;
`;

export default function Roadmap({ features }) {
  const { Tabs, currentTab } = useTabs([
    "Under Consideration",
    "Planned",
    "In Development",
    "Launched",
  ]);

  return (
    <MainLayout
      pageTitle={"RoadMap"}
      metaTitle={"RoadMap"}
      metaDescription={
        "The official AstroPlant roadmap! Everything we are working on right now and planning for the future."
      }
    >
      <TabsHolder>
        <Tabs />
      </TabsHolder>

      <CardGrid columns={4}>
        {currentTab === "Under Consideration" && (
          <>
            {features.under_consideration.map((feature) => (
              <FeatureCard feature={feature} key={feature.id} />
            ))}
          </>
        )}
        {currentTab === "Planned" && (
          <>
            {features.planned.map((feature) => (
              <FeatureCard feature={feature} key={feature.id} />
            ))}
          </>
        )}
        {currentTab === "In Development" && (
          <>
            {features.in_development.map((feature) => (
              <FeatureCard feature={feature} key={feature.id} />
            ))}
          </>
        )}
        {currentTab === "Launched" && (
          <>
            {features.launched.map((feature) => (
              <FeatureCard feature={feature} key={feature.id} />
            ))}
          </>
        )}
      </CardGrid>
    </MainLayout>
  );
}

export async function getStaticProps() {
  const res = await getAllFeatures();

  return {
    props: {
      features: res.data || [],
    },
    revalidate: REVALIDATION_DELAY,
  };
}

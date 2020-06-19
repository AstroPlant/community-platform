import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import Card from "../../cards/Card";
import DashboardGrid from "../../grids/DashboardGrid";

export default {
  component: DashboardGrid,
  title: "Grids/DashboardGrid",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <DashboardGrid>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </DashboardGrid>
  );
};

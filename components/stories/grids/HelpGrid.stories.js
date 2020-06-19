import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import Card from "../../cards/Card";
import HelpGrid from "../../grids/HelpGrid";

export default {
  component: HelpGrid,
  title: "Grids/HelpGrid",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <HelpGrid>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </HelpGrid>
  );
};

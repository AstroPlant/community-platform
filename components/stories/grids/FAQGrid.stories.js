import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import Card from "../../cards/Card";
import FAQGrid from "../../grids/FAQGrid";

export default {
  component: FAQGrid,
  title: "Grids/FAQGrid",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <FAQGrid>
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
    </FAQGrid>
  );
};

import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import FAQGrid from "../FAQGrid";
import Card from "../cards/Card";

export default {
  component: FAQGrid,
  title: "FAQGrid",
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

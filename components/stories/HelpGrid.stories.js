import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import HelpGrid from "../HelpGrid";
import Card from "../cards/Card";

export default {
  component: HelpGrid,
  title: "HelpGrid",
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

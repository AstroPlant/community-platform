import { text } from "@storybook/addon-knobs";
import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import Card from "../cards/Card";
import SidepanelSection from "../SidepanelSection";

export default {
  component: SidepanelSection,
  title: "SidepanelSection",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <SidepanelSection title={text("Title", "Information")}>
      <Card></Card>
      <Card></Card>
    </SidepanelSection>
  );
};

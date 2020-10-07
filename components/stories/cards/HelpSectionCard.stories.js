import { text, withKnobs } from "@storybook/addon-knobs";
import React from "react";
import HelpSectionCard from "../../cards/HelpSectionCard";

export default {
  component: HelpSectionCard,
  title: "cards/Help Section Card",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  const helpSection = {
    title: text("Title", "Title of the card"),
  };
  return <HelpSectionCard helpSection={helpSection} />;
};

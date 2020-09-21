import { text } from "@storybook/addon-knobs";
import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import Chip from "../Chip";

export default {
  component: Chip,
  title: "Chip",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return <Chip label={text("Label", "Category")} />;
};

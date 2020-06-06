import { boolean } from "@storybook/addon-knobs";
import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import ActivityIndicator from "../components/ActivityIndicator";

export default {
  component: ActivityIndicator,
  title: "ActivityIndicator",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return <ActivityIndicator active={boolean("Active", true)} />;
};

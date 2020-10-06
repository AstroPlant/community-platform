import { boolean, withKnobs } from "@storybook/addon-knobs";
import React from "react";
import ActivityIndicator from "../ActivityIndicator";

export default {
  component: ActivityIndicator,
  title: "ActivityIndicator",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return <ActivityIndicator active={boolean("Active", true)} />;
};

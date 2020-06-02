import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import DashboardGrid from "../DashboardGrid";

export default {
  component: DashboardGrid,
  title: "DashboardGrid",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return <DashboardGrid></DashboardGrid>;
};

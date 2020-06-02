import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import MapCard from "../Cards/MapCard";

export default {
  component: MapCard,
  title: "MapCard",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return <MapCard />;
};

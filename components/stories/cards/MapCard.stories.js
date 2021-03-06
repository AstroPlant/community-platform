import { withKnobs } from "@storybook/addon-knobs";
import React from "react";
import styled from "styled-components";
import MapCard from "../../cards/MapCard";

export default {
  component: MapCard,
  title: "cards/Map Card",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

const Card = styled(MapCard)`
  height: 50vh;
`;

export const Default = () => {
  return <Card />;
};

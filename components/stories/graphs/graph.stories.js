import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import Graph from "../../Graph";

export default {
  component: Graph,
  title: "Graphs/Graph",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

const graph = {
  id: 25,
  username: "rmnrss",
  kitSerial: "k-mqym-kdc8-b3t9",
  configId: 14,
  title: "Temperature Over Time",
  peripherals: [{ id: 44, peripheralDefinitionId: 6, quantityTypeId: 1 }],
};

export const Default = () => {
  return <Graph graph={graph} />;
};

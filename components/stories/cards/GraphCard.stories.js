import { action } from "@storybook/addon-actions";
import { text, number, array } from "@storybook/addon-knobs";
import { select, withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import GraphCard from "../../cards/GraphCard";

export default {
  component: GraphCard,
  title: "cards/GraphCard",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  const graph = {
    id: 24,
    title: text("Title", "Humidity Over Time"),
    type: select("Type", ["bar", "line"], "line"),
    owner: "rmnrss",
    kitSerial: text("Kit serial", "k-krmw-vp3y-v4g9"),
    configId: number("Config ID", 4),
    peripherals: array("Peripherals", [
      { id: 12, peripheralDefinitionId: 3, quantityTypeId: 3 },
    ]),
  };

  return <GraphCard graph={graph} editGraph={action("Editing...")} />;
};

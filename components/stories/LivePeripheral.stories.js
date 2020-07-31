import { text } from "@storybook/addon-knobs";
import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import LivePeripheral from "../LivePeripheral";

export default {
  component: LivePeripheral,
  title: "LivePeripheral",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  const peripheral = {
    details: {
      model: text("Peripheral Model", "ABC01025"),
      quantityTypes: [
        {
          physicalUnitSymbol: text("Physical Unit Symbol", "°C"),
          physicalQuantity: text("Physical Quantity", "Temperature"),
        },
      ],
    },
  };

  return <LivePeripheral peripheral={peripheral} />;
};

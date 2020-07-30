import { object } from "@storybook/addon-knobs";
import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import KitCard from "../../cards/KitCard";

export default {
  component: KitCard,
  title: "Cards/KitCard",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

const kit = {
  id: 2,
  serial: "k-krmw-vp3y-v4g9",
  name: "Virtual Test Kit #1",
  description:
    "This kit is virtual: it runs in a simulation. The implementation of the simulated environment and peripherals can be found [on GitHub](https://github.com/astroplant/astroplant-simulation).",
  latitude: 52.0944,
  longitude: 6.1332,
  privacyPublicDashboard: true,
  privacyShowOnMap: true,
  config: {
    id: 4,
    kitId: 2,
    description: "Test Conf #2",
    rulesSupervisorModuleName: "astroplant_kit.supervisor",
    rulesSupervisorClassName: "AstroplantSupervisorV1",
    rules: {},
    active: true,
    neverUsed: false,
    peripherals: [
      {
        id: 12,
        kitId: 2,
        kitConfigurationId: 4,
        peripheralDefinitionId: 3,
        name: "barom-1",
        configuration: { intervals: [Object] },
        details: {
          id: 3,
          name: "Virtual barometer",
          description: "A virtual barometer using the environment simulation.",
          brand: "AstroPlant Virtual",
          model: "Barometer",
          moduleName: "astroplant_simulation.sensors",
          className: "Barometer",
          configurationSchema: [Object],
          commandSchema: null,
          expectedQuantityTypes: [1],
          quantityTypes: [
            {
              id: 1,
              physicalQuantity: "Temperature",
              physicalUnit: "Degrees Celsius",
              physicalUnitSymbol: "°C",
            },
          ],
        },
      },
    ],
  },
};

export const Default = () => {
  return <KitCard kit={object("Kit", kit)} />;
};

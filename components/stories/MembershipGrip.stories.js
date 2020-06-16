import { array, withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import MembershipGrid from "../grids/MembershipGrid";

export default {
  component: MembershipGrid,
  title: "MembershipGrid",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

const memberships = [
  {
    id: 33,
    user: "rmnrss",
    kit: {
      id: 2,
      serial: "k-krmw-vp3y-v4g9",
      name: "Virtual Test Kit #1",
      description:
        "This kit is virtual: it runs in a simulation. The implementation of the simulated environment and peripherals can be found [on GitHub](https://github.com/astroplant/astroplant-simulation).",
      latitude: 52.0944,
      longitude: 6.1332,
      privacyPublicDashboard: true,
      privacyShowOnMap: true,
    },
    datetimeLinked: "2020-06-11T13:10:39.392Z",
    accessSuper: false,
    accessConfigure: false,
  },
  {
    id: 33,
    user: "rmnrss",
    kit: {
      id: 2,
      serial: "k-krmw-vp3y-v4g9",
      name: "Virtual Test Kit #1",
      description:
        "This kit is virtual: it runs in a simulation. The implementation of the simulated environment and peripherals can be found [on GitHub](https://github.com/astroplant/astroplant-simulation).",
      latitude: 52.0944,
      longitude: 6.1332,
      privacyPublicDashboard: true,
      privacyShowOnMap: true,
    },
    datetimeLinked: "2020-06-11T13:10:39.392Z",
    accessSuper: true,
    accessConfigure: false,
  },
];

export const Default = () => {
  return <MembershipGrid memberships={array("Memberships", memberships)} />;
};

export const Empty = () => {
  return <MembershipGrid memberships={array("Memberships", [])} />;
};

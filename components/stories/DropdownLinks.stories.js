import { object } from "@storybook/addon-knobs";
import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import DropdownLinks from "../DropdownLinks";

export default {
  component: DropdownLinks,
  title: "DropdownLinks",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

const extraLinks = [
  {
    label: "Settings",
    slug: "settings",
  },
  {
    label: "Log Out",
    slug: "logout",
  },
];

export const Default = () => {
  return <DropdownLinks links={object("Links", extraLinks)} />;
};

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

const links = [
  {
    name: "Linkeroonies",
  },
  { name: "Peperonies" },
];

export const Default = () => {
  console.log(links);
  return <DropdownLinks links={object("links", links)} />;
};

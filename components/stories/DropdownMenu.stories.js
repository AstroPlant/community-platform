import { boolean } from "@storybook/addon-knobs";
import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import DropdownMenu from "../DropdownMenu";

export default {
  component: DropdownMenu,
  title: "DropdownMenu",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <DropdownMenu hidden={boolean("Hide", true)}>
      <p>Hello I'm the DropDown content</p>
    </DropdownMenu>
  );
};

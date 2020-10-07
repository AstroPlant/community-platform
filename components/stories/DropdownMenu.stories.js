import { text, withKnobs } from "@storybook/addon-knobs";
import React from "react";
import MoreIcon from "../../public/icons/menu.svg";
import Button from "../Button";
import DropdownMenu from "../DropdownMenu";

export default {
  component: DropdownMenu,
  title: "DropdownMenu",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <DropdownMenu
      name={text("DropdownMenu", "DropDown")}
      trigger={<Button color={"darkLight"} icon={<MoreIcon />} />}
    >
      <p>Hello I'm the DropDown content</p>
    </DropdownMenu>
  );
};

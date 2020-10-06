import { action } from "@storybook/addon-actions";
import { number, select, withKnobs } from "@storybook/addon-knobs";
import React from "react";
import Notification from "../../public/icons/notification.svg";
import Icon from "../Icon";

export default {
  component: Icon,
  title: "Icon",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const actionsData = {
  onClick: action("clicked"),
};

export const Default = () => {
  return (
    <Icon
      size={number("Size", 32)}
      color={select("Color", [
        "light",
        "darkLight",
        "primary",
        "secondary",
        "error",
      ])}
      {...actionsData}
    >
      <Notification />
    </Icon>
  );
};

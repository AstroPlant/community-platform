import { action } from "@storybook/addon-actions";
import { text, withKnobs } from "@storybook/addon-knobs/react";
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
      size={text("Size", "32px")}
      color={text("Color", "primary")}
      {...actionsData}
    >
      <Notification />
    </Icon>
  );
};

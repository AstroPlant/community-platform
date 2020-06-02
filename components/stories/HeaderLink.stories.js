import { action } from "@storybook/addon-actions";
import { text, withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import HeaderLink from "../HeaderLink";

export default {
  component: HeaderLink,
  title: "HeaderLink",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const actionsData = {
  onClick: action("clicked"),
};

export const Default = () => {
  return <HeaderLink label={text("Label", "Header")} {...actionsData} />;
};

export const active = () => {
  return <HeaderLink active label={text("Label", "Hello")} {...actionsData} />;
};

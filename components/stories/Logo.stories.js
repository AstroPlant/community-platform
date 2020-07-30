import { number } from "@storybook/addon-knobs";
import { select, withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import Logo from "../Logo";

export default {
  component: Logo,
  title: "Logo",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <Logo
      color={select("Color", [
        "light",
        "darkLight",
        "primary",
        "secondary",
        "secondaryDark",
        "error",
      ])}
      size={number("Size", 32)}
    />
  );
};

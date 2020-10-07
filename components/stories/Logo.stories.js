import { number, select, withKnobs } from "@storybook/addon-knobs";
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
        "error",
      ])}
      size={number("Size", 32)}
    />
  );
};

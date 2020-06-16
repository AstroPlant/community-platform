import { number } from "@storybook/addon-knobs";
import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import Logo from "../Logo";

export default {
  component: Logo,
  title: "Logo",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return <Logo size={number("Size", 2)} />;
};

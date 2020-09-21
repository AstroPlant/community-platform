import { boolean } from "@storybook/addon-knobs";
import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import Brand from "../Brand";

export default {
  component: Brand,
  title: "Brand",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return <Brand vertical={boolean("Vertical", false)} />;
};

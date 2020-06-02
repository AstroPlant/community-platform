import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import Header from "../Header";

export default {
  component: Header,
  title: "Header",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return <Header />;
};

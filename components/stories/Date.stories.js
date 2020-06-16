import { text } from "@storybook/addon-knobs";
import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import Date from "../Date";

export default {
  component: Date,
  title: "Date",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return <Date dateString={text("Date", "2020-06-04T12:03:54.591Z")} />;
};

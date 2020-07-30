import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import SearchBar from "../inputs/SearchBar";

export default {
  component: SearchBar,
  title: "SearchBar",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return <SearchBar searchFor={"libraryMedias"} />;
};

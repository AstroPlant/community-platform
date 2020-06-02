import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import LibraryCard from "../Cards/LibraryCard";

export default {
  component: LibraryCard,
  title: "LibraryCard",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return <LibraryCard />;
};

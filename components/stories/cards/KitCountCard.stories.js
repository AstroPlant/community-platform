import { number, text, withKnobs } from "@storybook/addon-knobs";
import React from "react";
import KitCountCard from "../../cards/KitCountCard";

export default {
  component: KitCountCard,
  title: "cards/Kit Count Card",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <KitCountCard
      title={text("Title", "Active Countries")}
      count={number("Count", 12)}
    />
  );
};

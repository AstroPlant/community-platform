import { text, withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import KitCard from "../Cards/KitCard";

export default {
  component: KitCard,
  title: "KitCard",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <KitCard kitName={text("Name", "Name")} kitType={text("Type", "Type")} />
  );
};

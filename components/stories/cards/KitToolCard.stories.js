import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";
import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import KitToolCard from "../../cards/KitToolCard";

export default {
  component: KitToolCard,
  title: "Cards/KitToolCard",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <KitToolCard
      title={text("Title", "Title of the card")}
      description={text(
        "Description",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      )}
      action={action("Clicked !")}
    />
  );
};

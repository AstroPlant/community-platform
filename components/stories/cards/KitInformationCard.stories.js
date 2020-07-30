import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";
import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import KitInformationCard from "../../cards/KitInformationCard";

export default {
  component: KitInformationCard,
  title: "Cards/KitInformationCard",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <KitInformationCard
      title={text("Title", "Title of the card")}
      subtitle={text("Description", "Lorem ipsum")}
      action={action("Clicked !")}
    />
  );
};

import { text, withKnobs } from "@storybook/addon-knobs";
import React from "react";
import InformationCard from "../../cards/InformationCard";

export default {
  component: InformationCard,
  title: "cards/Information Card",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  const headline = text("Headline", "A headline");
  const details = text(
    "Details",
    "I am describing what the feature is about and it's actually amazing. I am describing what the feature is about and it's actually amazing.I am describing what the feature is about and it's actually amazing. "
  );

  return <InformationCard headline={headline} details={details} />;
};

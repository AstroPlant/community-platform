import { text, withKnobs } from "@storybook/addon-knobs";
import React from "react";
import FeatureCard from "../../cards/FeatureCard";

export default {
  component: FeatureCard,
  title: "cards/Feature Card",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  const featureData = {
    id: 54,
    created_at: "2019-10-18",
    name: text("Feature Name", "A Feature title!"),
    description: text(
      "Description",
      "I am describing what the feature is about and it's actually amazing. I am describing what the feature is about and it's actually amazing.I am describing what the feature is about and it's actually amazing. "
    ),
  };

  return <FeatureCard feature={featureData} />;
};

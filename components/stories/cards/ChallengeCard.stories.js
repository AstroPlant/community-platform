import { withKnobs } from "@storybook/addon-knobs";
import React from "react";
import ChallengeCard from "../../cards/ChallengeCard";

export default {
  component: ChallengeCard,
  title: "cards/Challenge Card",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return <ChallengeCard />;
};

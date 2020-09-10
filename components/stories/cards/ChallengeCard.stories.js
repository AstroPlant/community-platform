import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import ChallengeCard from "../../cards/ChallengeCard";

export default {
  component: ChallengeCard,
  title: "cards/ChallengeCard",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return <ChallengeCard />;
};

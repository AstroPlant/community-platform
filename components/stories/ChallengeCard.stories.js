import { date, text, withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import ChallengeCard from "../Cards/ChallengeCard";

export default {
  component: ChallengeCard,
  title: "ChallengeCard",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return <ChallengeCard />;
};
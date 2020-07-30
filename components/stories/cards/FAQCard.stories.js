import { text } from "@storybook/addon-knobs";
import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import FAQCard from "../../cards/FAQCard";

export default {
  component: FAQCard,
  title: "Cards/FAQCard",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  const faq = {
    question: text("Question", "A question maybe ?"),
    answer: text("Answer", "And obviously an aswer"),
    updated_at: text("Last Update", "2020-04-16"),
  };
  return <FAQCard faq={faq} />;
};

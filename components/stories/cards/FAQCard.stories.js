import { text, withKnobs } from "@storybook/addon-knobs";
import React from "react";
import FAQCard from "../../cards/FAQCard";

export default {
  component: FAQCard,
  title: "cards/FAQ Card",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  const faq = {
    question: text("Question", "A question maybe ?"),
    answer: text(
      "Answer",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    ),
    updated_at: text("Last Update", "2020-04-16"),
  };
  return <FAQCard faq={faq} />;
};

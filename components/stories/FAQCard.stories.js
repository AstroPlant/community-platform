import { date, text, withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import FAQCard from "../Cards/FAQCard";

export default {
  component: FAQCard,
  title: "FAQCard",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <FAQCard
      question={text("Question", "What ?")}
      answer={text("Answer", "Yes")}
      date={date("Update Date", new Date())}
    />
  );
};

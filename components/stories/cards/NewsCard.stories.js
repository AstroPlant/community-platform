import { text } from "@storybook/addon-knobs";
import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import styled from "styled-components";
import NewsCard from "../../cards/NewsCard";

export default {
  component: NewsCard,
  title: "Cards/NewsCard",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

const Holder = styled.div`
  height: 100vh;
`;

export const Default = () => {
  const articleData = {
    title: text("Title", "An article title!"),
    preview: text(
      "Preview",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    ),
    cover: { url: text("Cover URL", "/uploads/Placeholder_3028505c45.jpg") },
  };

  return (
    <Holder>
      <NewsCard featuredArticle={articleData} />
    </Holder>
  );
};

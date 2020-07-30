import { text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import styled from "styled-components";
import ArticleCard from "../../cards/ArticleCard";

export default {
  component: ArticleCard,
  title: "Cards/ArticleCard",
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
      "I am describing what the news is about and it's actually amazing"
    ),
    cover: { url: "/uploads/Placeholder_3028505c45.jpg" },
    published_at: text("Publication Date", "2019-10-18"),
  };

  return (
    <Holder>
      <ArticleCard article={articleData} onClick={action("Clicked")} />
    </Holder>
  );
};

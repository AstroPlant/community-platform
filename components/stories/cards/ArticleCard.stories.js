import { action } from "@storybook/addon-actions";
import { text, withKnobs } from "@storybook/addon-knobs";
import React from "react";
import ArticleCard from "../../cards/ArticleCard";

export default {
  component: ArticleCard,
  title: "cards/Article Card",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  const articleData = {
    title: text("Title", "An article title!"),
    preview: text(
      "Preview",
      "I am describing what the news is about and it's actually amazing"
    ),
    cover: {
      url: text(
        "Cover URL",
        "/uploads/ben_karpinski_k0rl_Vcamm_U_unsplash_394c7519e9.jpg"
      ),
    },
    published_at: text("Publication Date", "2019-10-18"),
  };

  return <ArticleCard article={articleData} onClick={action("Clicked")} />;
};

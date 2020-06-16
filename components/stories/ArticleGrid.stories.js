import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import ArticleGrid from "../grids/ArticleGrid";

export default {
  component: ArticleGrid,
  title: "ArticleGrid",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

const article = {
  id: "2",
  slug: "guess-what",
  created_at: "2020-06-04T12:03:54.591Z",
  title: "Guess what ?",
  short_description:
    "Crowdfunding delight.. after some weeks of testing AstroPlant Maker kits v6.0 are finally coming off the assembly line!",
  cover: {
    url: "/uploads/IMG_0094_1_e1571138002488_1024x768_28cb4ac6c7.jpeg",
  },
  author: {
    username: "macaronies",
  },
};

let articles = [];
for (let i = 0; i <= 4; i++) {
  articles.push(article);
}

export const Default = () => {
  console.log(articles);
  return <ArticleGrid articles={articles} />;
};

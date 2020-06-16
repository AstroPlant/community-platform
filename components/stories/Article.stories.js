import { object } from "@storybook/addon-knobs";
import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import Article from "../Article";

export default {
  component: Article,
  title: "Article",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

const article = {
  title: "Guess what ?",
  created_at: "2020-06-04T12:03:54.591Z",
  content:
    "Crowdfunding delight.. after some weeks of testing, we gave the green light to our production partner Axtron and now AstroPlant Maker kits v6.0 are finally coming off the assembly line!",
  cover: {
    url: "/uploads/IMG_0094_1_e1571138002488_1024x768_28cb4ac6c7.jpeg",
    caption: "",
  },
  author: {
    username: "macaronies",
  },
};

export const Default = () => {
  return <Article article={object("Article", article)} />;
};

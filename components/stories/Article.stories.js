import { text } from "@storybook/addon-knobs";
import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import Article from "../Article";

export default {
  component: Article,
  title: "Article",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  const article = {
    title: text("Title", "Guess what ?"),
    published_at: text("Publication date", "2020-06-04T12:03:54.591Z"),
    content: text(
      "Content",
      "Crowdfunding delight.. after some weeks of testing, we gave the green light to our production partner Axtron and now AstroPlant Maker kits v6.0 are finally coming off the assembly line!"
    ),
    cover: {
      url: "/uploads/Placeholder_3028505c45.jpg",
      caption: "",
    },
    categories: [{ title: "Biology" }, { title: "Art" }, { title: "Software" }],
  };

  return <Article article={article} />;
};

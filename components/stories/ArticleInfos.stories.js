import { text } from "@storybook/addon-knobs";
import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import ArticleInfos from "../ArticleInfos";

export default {
  component: ArticleInfos,
  title: "ArticleInfos",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  const author = {
    username: text("Username", "Guess"),
    firstName: text("First Name", "Who"),
    lastName: text("Last Name", "Dis"),
    avatar: {
      url: "/uploads/Placeholder_3028505c45.jpg",
      caption: "",
    },
  };

  return <ArticleInfos author={author} date={text("Date", "1970-05-21")} />;
};

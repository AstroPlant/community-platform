import { object, withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import styled from "styled-components";
import NewsCard from "../../cards/NewsCard";

export default {
  component: NewsCard,
  title: "Cards/NewsCard",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

const articleData = {
  title: "An article title!",
  short_description:
    "I am describing what the news is about and it's actually amazing",
  cover: { url: "/uploads/placeholder_c8fa25810a.jpeg" },
  author: { username: "DouglasAdams" },
};

export const Default = () => {
  return <NewsCard article={object("Article", articleData)} />;
};

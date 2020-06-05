import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import ArticleGrid from "../ArticleGrid";
import Card from "../cards/Card";

export default {
  component: ArticleGrid,
  title: "ArticleGrid",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <ArticleGrid>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </ArticleGrid>
  );
};

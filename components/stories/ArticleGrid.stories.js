import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import Card from "../cards/Card";
import ArticleGrid from "../grids/ArticleGrid";

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

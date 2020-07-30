import { text, withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import FeaturedArticleCard from "../../cards/FeaturedArticleCard";

export default {
  component: FeaturedArticleCard,
  title: "Cards/FeaturedArticleCard",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  const articleData = {
    title: text("Article Title", "An article title!"),
    preview: text(
      "Article Preview",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    ),
    cover: { url: "/uploads/Placeholder_3028505c45.jpg" },
    author: {
      username: text("Username", "DouglasAdams"),
      firstName: text("First Name", "Douglas"),
      lastName: text("Last name", "Adams"),
      avatar: { url: "/uploads/Placeholder_3028505c45.jpg" },
    },
    published_at: "2019-10-18",
  };

  return <FeaturedArticleCard featuredArticle={articleData} />;
};

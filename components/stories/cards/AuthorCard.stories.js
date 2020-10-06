import { text, withKnobs } from "@storybook/addon-knobs";
import React from "react";
import AuthorCard from "../../cards/AuthorCard";

export default {
  component: AuthorCard,
  title: "cards/Author Card",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  const author = {
    username: text("Username", "SpaceFarmerOfficial"),
    firstName: text("First Name", "Space"),
    lastName: text("Last Name", "Farmer"),
    description: text(
      "Description",
      "This is a description, how nice do you think it can be ?"
    ),
    avatar: {
      url: "/uploads/Placeholder_3028505c45.jpg",
      caption: "",
    },
  };

  return <AuthorCard author={author} />;
};

import { text, withKnobs } from "@storybook/addon-knobs";
import React from "react";
import UserCard from "../../cards/UserCard";

export default {
  component: UserCard,
  title: "cards/User Card",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  const user = {
    username: text("Username", "Username"),
    firstName: text("First Name", "Space"),
    lastName: text("Last Name", "Farmer"),
    description: text(
      "Description",
      "Describing what the user is about and it's actually amazing"
    ),
    avatar: null,
  };

  return <UserCard user={user} />;
};

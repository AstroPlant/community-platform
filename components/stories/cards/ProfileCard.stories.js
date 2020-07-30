import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";
import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import ProfileCard from "../../cards/ProfileCard";

export default {
  component: ProfileCard,
  title: "Cards/ProfileCard",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  let editable = boolean("Editable", false);

  const userData = {
    username: text("Username", "Bob"),
    slackUsername: text("Slack Username", "SlackName"),
    firstName: text("First Name", "Bob"),
    lastName: text("Last Name", "Meyers"),
    description: text(
      "Bio",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    ),
    avatar: { url: "/uploads/Placeholder_3028505c45.jpg" },
  };

  return (
    <ProfileCard
      user={userData}
      editAvatar={editable ? action("Editing Avatar") : null}
    />
  );
};

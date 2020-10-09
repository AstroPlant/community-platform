import { number, withKnobs } from "@storybook/addon-knobs";
import React from "react";
import Avatar from "../Avatar";

export default {
  component: Avatar,
  title: "Avatar",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return <Avatar size={number("Size", 96)} avatar={null} />;
};

export const withPicture = () => {
  return (
    <Avatar size={number("Size", 96)} avatar={{ url: "/uploads/image.jpg" }} />
  );
};

import { number, text, withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import imageFile from "../../public/placeholder.jpg";
import Avatar from "../Avatar";

export default {
  component: Avatar,
  title: "Avatar",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <Avatar username={text("Username", "Michel")} size={number("Size", 4)} />
  );
};

export const withPicture = () => {
  return (
    <Avatar
      hasPicture
      imgSrc={imageFile}
      size={number("Size", 4)}
      username={text("Username", "Michel")}
    />
  );
};

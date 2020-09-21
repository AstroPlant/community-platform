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
    <Avatar
      size={number("Size", 96)}
      username={text("Username", "PlantLover")}
    />
  );
};

export const withPicture = () => {
  return (
    <Avatar
      imgSrc={imageFile}
      size={number("Size", 96)}
      username={text("Username", "PlantLover")}
    />
  );
};

export const withBorders = () => {
  return (
    <Avatar
      bordered
      imgSrc={imageFile}
      size={number("Size", 96)}
      username={text("Username", "PlantLover")}
    />
  );
};

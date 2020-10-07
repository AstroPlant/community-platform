import { text, withKnobs } from "@storybook/addon-knobs";
import React from "react";
import PostImage from "../../posts/PostImage";

export default {
  component: PostImage,
  title: "posts/Post Image",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  const image = {
    image: { url: "/uploads/hello.jpg" },
    caption: text("Caption", "This is the caption"),
  };

  return <PostImage image={image} />;
};

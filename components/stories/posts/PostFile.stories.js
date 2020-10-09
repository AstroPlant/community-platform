import { text, withKnobs } from "@storybook/addon-knobs";
import React from "react";
import PostFile from "../../posts/PostFile";

export default {
  component: PostFile,
  title: "posts/PostFile",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  const file = {
    title: text("Title", "Title"),
    description: text("Description", "This is the description"),
    file: { url: "/uploads/hello.pdf" },
  };

  return <PostFile file={file} />;
};

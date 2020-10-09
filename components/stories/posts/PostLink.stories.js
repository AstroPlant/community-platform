import { text, withKnobs } from "@storybook/addon-knobs";
import React from "react";
import PostLink from "../../posts/PostLink";

export default {
  component: PostLink,
  title: "posts/Post Link",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  const link = {
    url: "https://unsplash.com/",
    url_caption: text("Caption", "The Caption"),
    meta_image_url: text(
      "Image url",
      "https://miro.medium.com/max/3150/1*r8AYd7cbKl_6fs61eHj-WQ.jpeg"
    ),
    meta_publisher: text("Publisher", "Unsplash"),
    meta_description: text(
      "Description",
      "Beautiful, free images and photos that you can download and use for any project. Better than any royalty free or stock photos."
    ),
  };

  return <PostLink link={link} />;
};

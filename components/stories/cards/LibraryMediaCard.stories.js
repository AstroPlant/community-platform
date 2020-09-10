import { string, number, object, text } from "@storybook/addon-knobs";
import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import LibraryMediaCard from "../../cards/LibraryMediaCard";

export default {
  component: LibraryMediaCard,
  title: "cards/LibraryMediaCard",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Link = () => {
  const mediaData = {
    id: 1,
    title: text("Media Title", "Title"),
    created_at: text("Media Date", "2020-05-12"),
    media: [
      {
        type: "Link",
        url: text("Media Url", "url.com"),
      },
    ],
  };

  return <LibraryMediaCard media={mediaData} />;
};

export const Article = () => {
  const mediaData = {
    id: 1,
    title: text("Media Title", "Title"),
    created_at: text("Media Date", "2020-05-12"),
    media: [
      {
        type: "Article",
        cover: {
          url: text("Cover Url", "/uploads/Placeholder_3028505c45.jpg"),
        },
      },
    ],
  };

  return <LibraryMediaCard media={mediaData} />;
};

export const File = () => {
  const mediaData = {
    id: 1,
    title: text("Media Title", "Title"),
    created_at: text("Media Date", "2020-05-12"),
    media: [
      {
        type: "File",
        file: { url: text("File Url", "/uploads/Placeholder_3028505c45.jpg") },
      },
    ],
  };

  return <LibraryMediaCard media={mediaData} />;
};

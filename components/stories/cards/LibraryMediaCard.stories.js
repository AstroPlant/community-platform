import { text, withKnobs } from "@storybook/addon-knobs";
import React from "react";
import LibraryMediaCard from "../../cards/LibraryMediaCard";

export default {
  component: LibraryMediaCard,
  title: "cards/Library Media Card",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Link = () => {
  const mediaData = {
    id: 1,
    title: text("Media Title", "Title"),
    created_at: text("Media Date", "2020-05-12"),
    type: "links",
  };

  return <LibraryMediaCard media={mediaData} />;
};

export const Article = () => {
  const mediaData = {
    id: 1,
    title: text("Media Title", "Title"),
    created_at: text("Media Date", "2020-05-12"),
    type: "article",
  };

  return <LibraryMediaCard media={mediaData} />;
};

export const File = () => {
  const mediaData = {
    id: 1,
    title: text("Media Title", "Title"),
    created_at: text("Media Date", "2020-05-12"),
    type: "files",
  };

  return <LibraryMediaCard media={mediaData} />;
};

export const Tutorial = () => {
  const mediaData = {
    id: 1,
    title: text("Media Title", "Title"),
    created_at: text("Media Date", "2020-05-12"),
    type: "tutorial",
  };

  return <LibraryMediaCard media={mediaData} />;
};

export const Album = () => {
  const mediaData = {
    id: 1,
    title: text("Media Title", "Title"),
    created_at: text("Media Date", "2020-05-12"),
    type: "album",
  };

  return <LibraryMediaCard media={mediaData} />;
};

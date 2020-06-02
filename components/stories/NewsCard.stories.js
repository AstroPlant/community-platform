import { text, withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import imageFile from "../../public/placeholder.jpg";
import NewsCard from "../Cards/NewsCard";
import styled from "styled-components";

export default {
  component: NewsCard,
  title: "NewsCard",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

const Card = styled(NewsCard)`
  height: 50vh;
`;

export const Default = () => {
  return (
    <Card
      title={text("Title", "Title")}
      description={text("Description", "description")}
      imgSrc={imageFile}
    />
  );
};

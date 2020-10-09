import { select, text, withKnobs } from "@storybook/addon-knobs";
import React from "react";
import LoadingAnimation from "../LoadingAnimation";

export default {
  component: LoadingAnimation,
  title: "LoadingAnimation",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <LoadingAnimation
      message={text("Message", "Loading...")}
      color={select("Color", [
        "light",
        "darkLight",
        "primary",
        "secondary",
        "error",
      ])}
    />
  );
};

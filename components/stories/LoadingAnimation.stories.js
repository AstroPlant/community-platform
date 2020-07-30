import { select, text } from "@storybook/addon-knobs";
import { withKnobs } from "@storybook/addon-knobs/react";
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
        "secondaryDark",
        "error",
      ])}
    >
      <Notification />
    </LoadingAnimation>
  );
};

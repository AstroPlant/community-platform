import { text, withKnobs } from "@storybook/addon-knobs";
import React from "react";
import InProgress from "../InProgress";

export default {
  component: InProgress,
  title: "InProgress",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <InProgress
      title={text("Information Title", "Creating documentation")}
      details={text(
        "Information Details",
        "Creating documentation is an important step we are currently taking at astroplant, come back soon for more!"
      )}
    />
  );
};

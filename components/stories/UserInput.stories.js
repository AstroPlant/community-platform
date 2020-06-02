import { action } from "@storybook/addon-actions";
import { text, withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import UserInput from "../UserInput";

export default {
  component: UserInput,
  title: "UserInput",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const actionsData = {
  onClick: action("clicked"),
};

export const Default = () => {
  return (
    <UserInput
      label={text("Label", "Label")}
      placeholder={text("Placeholder", "Placeholder")}
      type={text("Type", "text")}
      {...actionsData}
    ></UserInput>
  );
};

export const TextNoLabel = () => {
  return (
    <UserInput
      placeholder={text("Placeholder", "Placeholder")}
      type={"text"}
      {...actionsData}
    ></UserInput>
  );
};

export const TextDark = () => {
  return (
    <UserInput
      dark
      placeholder={text("Placeholder", "Placeholder")}
      type={"text"}
      {...actionsData}
    ></UserInput>
  );
};

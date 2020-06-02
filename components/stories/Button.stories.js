import { action } from "@storybook/addon-actions";
import { text, withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import Button from "../Button";

export default {
  component: Button,
  title: "Button",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const actionsData = {
  onClick: action("clicked"),
  onMouseOver: action("hovered"),
};

export const Default = () => {
  return (
    <Button
      label={text("Label", "Hello Storybook")}
      color={text("Color", "#56F265")}
      {...actionsData}
    />
  );
};

export const inverted = () => {
  return (
    <Button
      inverted
      label={text("Label", "Hello Storybook")}
      color={text("Color", "#000")}
      {...actionsData}
    />
  );
};

export const Large = () => {
  return (
    <Button
      large
      label={text("Label", "Hello Storybook")}
      color={text("Color", "#56F265")}
      {...actionsData}
    />
  );
};

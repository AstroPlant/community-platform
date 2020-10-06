import { action } from "@storybook/addon-actions";
import { select, text, withKnobs } from "@storybook/addon-knobs";
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
      label={text("Label", "Hello Space Farmers!")}
      color={select(
        "Color",
        ["light", "darkLight", "primary", "secondary", "secondary", "error"],
        "primary"
      )}
      {...actionsData}
    />
  );
};

export const inverted = () => {
  return (
    <Button
      inverted
      label={text("Label", "Inverted")}
      color={select(
        "Color",
        ["light", "darkLight", "primary", "secondary", "secondary", "error"],
        "darkLight"
      )}
      {...actionsData}
    />
  );
};

export const Large = () => {
  return (
    <Button
      large
      label={text("Label", "Large")}
      color={select(
        "Color",
        ["light", "darkLight", "primary", "secondary", "secondary", "error"],
        "primary"
      )}
      {...actionsData}
    />
  );
};

export const Disabled = () => {
  return <Button disabled label={text("Label", "Disabled")} {...actionsData} />;
};

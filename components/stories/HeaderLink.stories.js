import { action } from "@storybook/addon-actions";
import { text, withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import HeaderLink from "../HeaderLink";

export default {
  component: HeaderLink,
  title: "HeaderLink",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const actionsData = {
  onClick: action("clicked"),
};

const link = {
  label: "Link",
  slug: "link",
};

export const Default = () => {
  return (
    <HeaderLink
      label={text("Label", link.label)}
      slug={text("Slug", link.slug)}
      {...actionsData}
    />
  );
};

export const active = () => {
  return (
    <HeaderLink
      label={text("Label", link.label)}
      slug={text("Slug", link.slug)}
      {...actionsData}
    />
  );
};

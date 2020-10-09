import { number, text, withKnobs } from "@storybook/addon-knobs";
import React from "react";
import Notification from "../../../public/icons/notification.svg";
import HelpCard from "../../cards/HelpCard";

export default {
  component: HelpCard,
  title: "cards/Help Card",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <HelpCard
      iconSize={number("Icon Size", 32)}
      iconSVG={<Notification />}
      title={text("Title", "Help Card")}
    />
  );
};

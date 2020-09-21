import { text, withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import Notification from "../../../public/icons/notification.svg";
import HelpCard from "../../cards/HelpCard";
import styled from "styled-components";
import { number } from "@storybook/addon-knobs";

export default {
  component: HelpCard,
  title: "cards/HelpCard",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

const Card = styled(HelpCard)`
  height: 50vh;
`;

export const Default = () => {
  return (
    <Card
      iconSize={number("Icon Size", 32)}
      iconSVG={<Notification />}
      title={text("Title", "Help Card")}
    />
  );
};

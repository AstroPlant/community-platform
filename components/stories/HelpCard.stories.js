import { text, withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import Notification from "../../public/icons/notification.svg";
import HelpCard from "../cards/HelpCard";
import styled from "styled-components";

export default {
  component: HelpCard,
  title: "HelpCard",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

const Card = styled(HelpCard)`
  height: 50vh;
`;

export const Default = () => {
  return (
    <Card
      iconSize={text("Icon Size", "32px")}
      text={text("Text", "Help Card")}
      iconSVG={<Notification />}
    />
  );
};

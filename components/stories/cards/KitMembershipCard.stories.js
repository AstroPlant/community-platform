import { text, withKnobs } from "@storybook/addon-knobs";
import React from "react";
import styled from "styled-components";
import KitMembershipCard from "../../cards/KitMembershipCard";

export default {
  component: KitMembershipCard,
  title: "cards/Kit Membership Card",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

const GreyCard = styled(KitMembershipCard)`
  && {
    background-color: #252525;
  }
`;

export const Default = () => {
  const membership = {
    kit: {
      name: text("Kit Name", "Farmer Kit"),
      serial: text("Serial", "k-dsfsd4"),
    },
  };

  return <GreyCard membership={membership} />;
};

import { text, withKnobs } from "@storybook/addon-knobs";
import React from "react";
import styled from "styled-components";
import Campaign from "../../../public/icons/campaign.svg";
import DashboardLinkCard from "../../cards/DashboardLinkCard";

export default {
  component: DashboardLinkCard,
  title: "cards/DashboardLink Card",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

const Holder = styled.div`
  padding: 2rem;
`;

export const Default = () => {
  const title = text("Title", "A title!");
  const description = text(
    "Description",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  );

  return (
    <Holder>
      <DashboardLinkCard
        href={"/"}
        title={title}
        description={description}
        icon={<Campaign />}
      />
    </Holder>
  );
};

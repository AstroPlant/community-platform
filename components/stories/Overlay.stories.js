import { boolean } from "@storybook/addon-knobs";
import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import styled from "styled-components";
import LibraryCard from "../cards/LibraryCard";
import Overlay from "../Overlay";

export default {
  component: Overlay,
  title: "Overlay",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

const Holder = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: #fff;
`;

export const Default = () => {
  return (
    <Holder>
      <Overlay show={boolean("Show", false)}>
        <LibraryCard />
      </Overlay>
    </Holder>
  );
};

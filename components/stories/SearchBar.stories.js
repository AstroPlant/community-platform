import { withKnobs } from "@storybook/addon-knobs";
import React from "react";
import styled from "styled-components";
import SearchBar from "../inputs/SearchBar";

export default {
  component: SearchBar,
  title: "SearchBar",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

const GreySearchBar = styled(SearchBar)`
  background-color: #252525;
`;

export const Default = () => {
  return <GreySearchBar />;
};

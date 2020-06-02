import { withKnobs } from "@storybook/addon-knobs/react";
import React, { useState } from "react";
import Dropdown from "../Dropdown";

export default {
  component: Dropdown,
  title: "Dropdown",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  const [reverse, setReverse] = useState(false);

  return <Dropdown reverse={reverse} onClick={() => setReverse(!reverse)} />;
};

import { addDecorator } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/global";
import theme from "../styles/theme";

addDecorator((s) => (
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {s()}
    </ThemeProvider>
  </>
));

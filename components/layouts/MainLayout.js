import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Path from "../Path";
import SearchBar from "../SearchBar";
import BaseLayout from "./BaseLayout";

const HeadRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: ${(props) => props.theme.gridGap};
  align-items: center;
`;

export default function MainLayout({ children, pageTitle }) {
  return (
    <BaseLayout>
      <Path />
      <HeadRow>
        <h2>{pageTitle}</h2>
        <SearchBar />
      </HeadRow>
      {children}
    </BaseLayout>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

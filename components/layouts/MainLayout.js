import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Grid from "../grids/Grid";
import Path from "../Path";
import SearchBar from "../SearchBar";
import BaseLayout from "./BaseLayout";

const HeadRow = styled(Grid)`
  align-items: center;
`;

export default function MainLayout(props) {
  return (
    <BaseLayout>
      <Path />
      <HeadRow>
        <h2>{props.pageTitle}</h2>
        <SearchBar />
      </HeadRow>
      {props.children}
    </BaseLayout>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

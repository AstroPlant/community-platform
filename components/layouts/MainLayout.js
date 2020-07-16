import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Grid from "../grids/Grid";
import Path from "../Path";
import BaseLayout from "./BaseLayout";
import SearchBar from "../inputs/SearchBar";

const HeadRow = styled(Grid)`
  && {
    padding: 0;
  }
`;

export default function MainLayout(props) {
  return (
    <BaseLayout>
      <Path />
      <HeadRow>
        <h2>{props.pageTitle}</h2>
        {!props.hideSearch && <SearchBar search={null} />}
      </HeadRow>
      {props.children}
    </BaseLayout>
  );
}

MainLayout.propTypes = {
  /* Node children of the component */
  children: PropTypes.node.isRequired,
  /* Whether or not to hide the searchbar */
  hideSearch: PropTypes.bool,
};

MainLayout.defaultProps = {
  hideSearch: false,
};

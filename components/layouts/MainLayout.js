import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Grid from "../grids/Grid";
import Path from "../Path";
import BaseLayout from "./BaseLayout";
import SearchBar from "../inputs/SearchBar";
import SearchableContent from "../SearchableContent";

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
        {props.enableSearch && <SearchBar searchFor={props.searchFor} />}
      </HeadRow>

      {props.enableSearch ? (
        <SearchableContent type={props.searchFor}>
          {props.children}
        </SearchableContent>
      ) : (
        <>{props.children}</>
      )}
    </BaseLayout>
  );
}

MainLayout.propTypes = {
  /* Node children of the component */
  children: PropTypes.node.isRequired,
  /* Whether or not to hide the searchbar */
  enableSearch: PropTypes.bool,
  /* The type of content to search */
  searchFor: PropTypes.string,
};

MainLayout.defaultProps = {
  enableSearch: false,
  searchFor: null,
};

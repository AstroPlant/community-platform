import PropTypes from "prop-types";
import React from "react";
import Grid from "../grids/Grid";
import MainLayout from "./MainLayout";

export default function ArticleLayout(props) {
  return (
    <MainLayout>
      <Grid>{props.children}</Grid>
    </MainLayout>
  );
}

ArticleLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

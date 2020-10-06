import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Path from "../Path";
import PageLayout from "./PageLayout";

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function MainLayout({
  metaDescription,
  metaTitle,
  pageTitle,
  children,
}) {
  return (
    <PageLayout metaTitle={metaTitle} metaDescription={metaDescription}>
      <Path />
      <h2>{pageTitle}</h2>

      <PageContent>{children}</PageContent>
    </PageLayout>
  );
}

MainLayout.propTypes = {
  /**
   * Node children of the component
   */
  children: PropTypes.node.isRequired,
  /**
   * Meta title of the page
   */
  metaTitle: PropTypes.string,
  /**
   * Title of the page
   */
  pageTitle: PropTypes.string,
  /**
   * Meta description of the page
   */
  metaDescription: PropTypes.string,
};

MainLayout.defaultProps = {
  metaTitle: null,
  pageTitle: null,
  metaDescription: null,
};

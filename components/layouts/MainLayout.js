import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Breaks from "../../utils/breakpoints";
import Path from "../Path";
import PageLayout from "./PageLayout";

const HeadRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: ${Breaks.medium}) {
    flex-direction: column-reverse;
  }
`;

const PageTitle = styled.h2`
  margin-right: auto;
`;

export default function MainLayout(props) {
  return (
    <PageLayout
      metaTitle={props.metaTitle}
      metaDescription={props.metaDescription}
    >
      <Path />
      <HeadRow>
        <PageTitle>{props.pageTitle}</PageTitle>
      </HeadRow>

      {props.children}
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

import Head from "next/head";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Breaks from "../../utils/breakpoints";
import Header from "../Header";

const Content = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  min-height: calc(100vh - ${(props) => props.theme.headerHeight});

  margin: ${(props) => props.theme.headerHeight} auto 0 auto;
  padding: 3.75rem 2rem 2rem 2rem;

  max-width: ${(props) => (props.limitWidth ? "1920px" : "unset")};

  @media screen and (max-width: ${Breaks.medium}) {
    padding: 1rem 2rem;
  }

  @media screen and (max-width: ${Breaks.small}) {
    padding: 0.5rem 1rem;
  }
`;

export default function PageLayout(props) {
  return (
    <>
      <Head>
        <title>
          {props.metaTitle && `${props.metaTitle} | `}AstroPlant Platform
        </title>
        <meta name="description" content={props.metaDescription || ""} />
      </Head>
      <Header />
      <Content limitWidth={props.limitWidth}>{props.children}</Content>
    </>
  );
}

PageLayout.propTypes = {
  /* Content of the Layout */
  children: PropTypes.node.isRequired,
  /* Meta title of the page */
  metaTitle: PropTypes.string,
  /* Meta description of the page */
  metaDescription: PropTypes.string,
  /* Wether or not to prevent the content from filling the whole screen */
  limitWidth: PropTypes.bool,
};

PageLayout.defaultProps = {
  metaTitle: null,
  metaDescription: null,
  limitWidth: true,
};

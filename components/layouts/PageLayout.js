import Head from "next/head";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Header from "../Header";

const Content = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  min-height: calc(100vh - ${(props) => props.theme.headerHeight});

  margin-top: ${(props) => props.theme.headerHeight};
  padding: 2rem;

  @media screen and (max-width: 464px) {
    padding: 1rem;
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
      <Content>{props.children}</Content>
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
};

PageLayout.defaultProps = {
  metaTitle: null,
  metaDescription: null,
};

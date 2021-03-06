import Head from "next/head";
import { useRouter } from "next/router";
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
  padding: 0rem 2rem 2rem 2rem;

  max-width: ${(props) => (props.limitWidth ? "1920px" : "unset")};

  @media screen and (max-width: ${Breaks.medium}) {
    padding: 1rem 2rem;
  }

  @media screen and (max-width: ${Breaks.small}) {
    padding: 0.5rem 1rem;
  }
`;

export default function PageLayout({
  children,
  limitWidth,
  metaTitle,
  metaDescription,
}) {
  const router = useRouter();

  const publicUrl = `https://app.astroplant.sda-projects.nl`;
  const fullUrl = `${publicUrl}${router.asPath}`;

  const fullTitle = `${metaTitle} | AstroPlant Community Platform`;

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="title" content={fullTitle} />
        <meta name="description" content={metaDescription || ""} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={metaDescription || ""} />
        <meta property="og:image" content="/images/meta-image" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={fullUrl} />
        <meta property="twitter:title" content={fullTitle} />
        <meta property="twitter:description" content={metaDescription || ""} />
        <meta property="twitter:image" content="/images/meta-image" />
      </Head>

      <Header />
      <Content limitWidth={limitWidth}>{children}</Content>
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

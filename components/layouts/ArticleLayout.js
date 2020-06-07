import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Path from "../Path";
import BaseLayout from "./BaseLayout";

const PageLayout = styled.div`
  position: relative;

  width: 100%;
  max-width: 1280px;
  margin: auto;
  padding: 0 2rem;
`;

export default function ArticleLayout({ children }) {
  return (
    <BaseLayout>
      <PageLayout>
        <Path />
        {children}
      </PageLayout>
    </BaseLayout>
  );
}

ArticleLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

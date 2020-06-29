import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Header from "../Header";

const Content = styled.div`
  margin-top: ${(props) => props.theme.headerHeight};
  padding: 2rem;

  display: flex;
  flex-direction: column;

  height: calc(100vh - ${(props) => props.theme.headerHeight});
  min-height: calc(100vh - ${(props) => props.theme.headerHeight});
`;

export default function BaseLayout({ children }) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
}

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

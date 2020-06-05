import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Header from "../Header";
import Path from "../Path";
import SearchBar from "../SearchBar";

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Content = styled.div`
  padding: 2rem;

  display: flex;
  flex-direction: column;

  height: calc(100vh - ${(props) => props.theme.headerHeight});
  min-height: calc(100vh - ${(props) => props.theme.headerHeight});
`;

const FirstRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: ${(props) => props.theme.gridGap};
  align-items: center;
`;

export default function Layout({ children, home, title }) {
  return (
    <Wrapper>
      <Header />
      <Content>
        {!home && (
          <>
            <Path />
            <FirstRow>
              <h2>{title}</h2>
              <SearchBar />
            </FirstRow>{" "}
          </>
        )}
        {children}
      </Content>
    </Wrapper>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

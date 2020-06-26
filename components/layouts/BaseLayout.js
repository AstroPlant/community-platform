import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { getLoggedUser } from "../../providers/Auth";
import Header from "../Header";

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

export default function BaseLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      <Content>{children}</Content>
    </Wrapper>
  );
}

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

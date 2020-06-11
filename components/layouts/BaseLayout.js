import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Header from "../Header";
import { getLoggedUser } from "../../providers/Auth";

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
  console.log(getLoggedUser());
  return (
    <Wrapper>
      <Header username={getLoggedUser()} />
      <Content>{children}</Content>
    </Wrapper>
  );
}

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

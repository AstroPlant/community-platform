import React from "react";
import styled from "styled-components";
import PageLayout from "../components/layouts/PageLayout";
import WrapInLink from "../components/WrapInLink";
import Breaks from "../utils/breakpoints";

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: calc(100vh - 5.75rem - ${(props) => props.theme.headerHeight});
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: ${Breaks.medium}) {
    flex-direction: column;
  }
`;

const ErrorHolder = styled.div`
  text-align: center;
  color: ${(props) => props.theme.primary};
`;

const ErrorCode = styled.div`
  font-size: 6rem;
  font-weight: 600;
  line-height: 1.05;
`;

const ErrorMessage = styled.b`
  font-size: 1.5rem;
  text-transform: uppercase;
`;

const Separator = styled.div`
  display: block;
  height: 128px;
  width: 1px;
  background-color: ${(props) => props.theme.grey};
  margin: 0 2rem;

  @media screen and (max-width: ${Breaks.medium}) {
    height: 1px;
    width: 128px;
    margin: 2rem 0;
  }
`;

const Indication = styled.p`
  line-height: 1.5em;
  a {
    font-weight: 450;
    color: ${(props) => props.theme.primary};
  }

  @media screen and (max-width: ${Breaks.medium}) {
    text-align: center;
  }
`;

export default function ErrorPage() {
  return (
    <PageLayout metaTitle="Page not found">
      <Center>
        <ErrorContainer>
          <ErrorHolder>
            <ErrorCode>404</ErrorCode>
            <ErrorMessage>Page not found</ErrorMessage>
          </ErrorHolder>
          <Separator />
          <Indication>
            Looks like this page doesn’t exist... <br />
            Click <WrapInLink href={"/"}>here</WrapInLink> to navigate to the
            home page.
          </Indication>
        </ErrorContainer>
      </Center>
    </PageLayout>
  );
}

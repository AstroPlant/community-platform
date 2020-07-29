import React from "react";
import styled from "styled-components";
import PageLayout from "../components/layouts/PageLayout";
import WrapInLink from "../components/WrapInLink";

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100vh;

  text-align: center;
`;

const ErrorHolder = styled.div`
  color: ${(props) => props.theme.primary};
`;

const ErrorTitle = styled.div`
  font-size: 6rem;
  font-weight: 600;
  line-height: 1.05;
`;

const ErrorMessage = styled.b`
  font-size: 1.5rem;
  text-transform: uppercase;
`;

const Message = styled.h2`
  margin: 1.5rem 0;
`;

const Intructions = styled.p`
  a {
    font-weight: 450;
    color: ${(props) => props.theme.primary};
  }
`;

export default function ErrorPage() {
  return (
    <PageLayout metaTitle="Page not found">
      <Center>
        <ErrorHolder>
          <ErrorTitle>404</ErrorTitle>
          <ErrorMessage>Page not found</ErrorMessage>
        </ErrorHolder>

        <Message>Looks like this page doesn’t exist...</Message>
        <Intructions>
          Click <WrapInLink href={"/"}>here</WrapInLink> to navigate to the home
          page.
        </Intructions>
      </Center>
    </PageLayout>
  );
}

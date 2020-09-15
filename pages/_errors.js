import React from "react";
import styled from "styled-components";
import PageLayout from "../components/layouts/PageLayout";

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100vh;

  text-align: center;
`;

const StatusCode = styled.p`
  color: ${(props) => props.theme.primary};
`;

function Error({ statusCode }) {
  return (
    <PageLayout>
      <Center>
        <StatusCode>{statusCode}</StatusCode>
        <p>
          {statusCode
            ? `An error occurred on server`
            : "An error occurred on client"}
        </p>
      </Center>
    </PageLayout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

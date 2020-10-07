import React from "react";
import styled from "styled-components";
import InProgress from "../InProgress";
import Card from "./Card";

const Container = styled(Card)`
  flex-flow: column;
  align-items: center;
  justify-content: center;

  text-align: center;
`;

const Details = styled.p`
  max-width: 384px;

  a {
    font-weight: bold;
    color: ${(props) => props.theme.primary};
  }
`;

export default function KitCard(props) {
  return (
    <Container {...props}>
      <InProgress title="Kit Dashboards" />
      <Details>
        We're currently working on a new version of Kit Dashboards. For now you
        can use the{" "}
        <a
          href="http://astroplant-alpha.surge.sh/home"
          target="_blank"
          rel="noopener"
        >
          current tools
        </a>{" "}
        to access and edit your kits. To learn more about the new features
        please{" "}
        <a href="http://astroplant.slack.com/" target="_blank" rel="noopener">
          join our Slack
        </a>
        .
      </Details>
    </Container>
  );
}

KitCard.propTypes = {};
KitCard.defaultProps = {};

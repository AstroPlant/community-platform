import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import WrapInLink from "../WrapInLink";
import Card from "./Card";

const Container = styled(Card)`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: flex-start;

  text-align: start;
`;

const TitleRow = styled.div`
  flex: 1;
`;

const ChallengeContent = styled.div`
  flex: 7;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  height: 100%;
  width: 100%;
  padding: 1rem 0;
`;

export default function ChallengeCard(props) {
  return (
    <WrapInLink href={"/challenges"}>
      <Container animateOnHover className={props.className}>
        <TitleRow>
          <h3>Community Challenges</h3>
        </TitleRow>
        <ChallengeContent>
          <p>Comming Soon...</p>
        </ChallengeContent>
      </Container>
    </WrapInLink>
  );
}

ChallengeCard.propTypes = {
  /**
   * Styling class of the container. Used by styled-components.
   */
  className: PropTypes.string,
};

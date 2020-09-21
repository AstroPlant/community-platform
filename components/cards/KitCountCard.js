import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import ActivityIndicator from "../ActivityIndicator";
import Card from "./Card";

const Container = styled(Card)`
  && {
    margin: 0 0 1rem 0;
    height: unset;
  }

  align-items: center;
  justify-content: space-between;
`;

const CountRow = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.i`
  font-size: 1em;
  font-weight: 300;
`;

const Count = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
`;

export default function KitCountCard({ title, count }) {
  return (
    <Container>
      <Title>{title}</Title>
      <CountRow>
        <ActivityIndicator active />
        <Count>{count}</Count>
      </CountRow>
    </Container>
  );
}

KitCountCard.propTypes = {
  /**
   * Title of the card
   */
  title: PropTypes.string.isRequired,
  /**
   * The main number to be featured
   */
  count: PropTypes.number.isRequired,
};

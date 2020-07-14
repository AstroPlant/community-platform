import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import ActivityIndicator from "../ActivityIndicator";
import Card from "./Card";

const MarginCard = styled(Card)`
  && {
    margin-bottom: 1rem;
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
  font-size: 1.25rem;
  font-weight: 300;
`;

const Count = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
`;

export default function KitCountCard(props) {
  return (
    <MarginCard>
      <Title>{props.title}</Title>
      <CountRow>
        <ActivityIndicator active />
        <Count>{props.count}</Count>
      </CountRow>
    </MarginCard>
  );
}

KitCountCard.propTypes = {
  /* Title of the card */
  title: PropTypes.string.isRequired,
  /* The main number to be featured */
  count: PropTypes.number.isRequired,
};

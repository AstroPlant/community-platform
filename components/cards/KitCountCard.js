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
`;

const CardContent = styled.div`
  display: flex;
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

export default function KitCountCard({ title, count }) {
  return (
    <MarginCard>
      <CardContent>
        <Title>{title}</Title>
        <CountRow>
          <ActivityIndicator active />
          <Count>{count}</Count>
        </CountRow>
      </CardContent>
    </MarginCard>
  );
}

KitCountCard.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

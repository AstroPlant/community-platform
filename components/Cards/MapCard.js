import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Card from "./Card";

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
`;

const TitleRow = styled.div`
  flex: 1;
`;

const MapContainer = styled.div`
  flex: 9;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const MapPlaceholder = styled.div`
  display: block;
  height: 100px;
  width: 100px;
  background-color: white;
  margin: 2rem;
`;

export default function MapCard({ className }) {
  return (
    <Container className={className}>
      <TitleRow>
        <h3>Kit Map</h3>
      </TitleRow>
      <MapContainer>
        <MapPlaceholder />
      </MapContainer>
    </Container>
  );
}

MapCard.propTypes = {
  className: PropTypes.string,
};

import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import WrapInLink from "../WrapInLink";
import Card from "./Card";

const Container = styled(Card)`
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

const MapImage = styled.img`
  object-fit: contain;
  padding-top: 1rem;
`;

export default function MapCard(props) {
  return (
    <WrapInLink href={"/map"}>
      <Container animateOnHover className={props.className}>
        <TitleRow>
          <h3>Kit Map</h3>
        </TitleRow>
        <MapContainer>
          <MapImage
            src="/images/world-map.svg"
            alt="A black and white world map."
          />
        </MapContainer>
      </Container>
    </WrapInLink>
  );
}

MapCard.propTypes = {
  /**
   * Styling class of the container. Used by styled-components.
   */
  className: PropTypes.string,
};

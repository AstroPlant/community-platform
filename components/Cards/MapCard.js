import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import WrapInLink from "../WrapInLink";
import Card from "./Card";
import WorldMap from "../../public/images/world-map.svg";

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

const MapImage = styled.img`
  object-fit: contain;
  padding-top: 1rem;
`;

export default function MapCard({ className, href }) {
  return (
    <WrapInLink href={href}>
      <Container animateOnHover className={className}>
        <TitleRow>
          <h3>Kit Map</h3>
        </TitleRow>
        <MapContainer>
          <MapImage src="/images/world-map.svg" />
        </MapContainer>
      </Container>
    </WrapInLink>
  );
}

MapCard.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  as: PropTypes.string,
};

MapCard.defaultProps = {
  href: "/",
};

import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import WrapInLink from "../WrapInLink";
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
  background-color: white;
`;

export default function MapCard({ className, href }) {
  return (
    <WrapInLink href={href}>
      <Container className={className}>
        <TitleRow>
          <h3>Kit Map</h3>
        </TitleRow>
        <MapContainer />
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

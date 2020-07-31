import Leaflet from "leaflet";
import PropTypes from "prop-types";
import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import styled from "styled-components";
import Logo from "./Logo";

const MarginLogo = styled(Logo)`
  margin-right: 1rem;
`;

const KitName = styled.b`
  margin: 0;
`;

export default function MapBuilder(props) {
  const Netherlands = [52.1326, 5.2913];

  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
  const tilesUrl =
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  const markerIcon = Leaflet.icon({
    iconUrl: "/icons/map-marker.svg",
    iconRetinaUrl: "/icons/map-marker.svg",

    iconSize: [32, 32],
    iconAnchor: [16, 16], // point of the icon which will correspond to marker's location
  });

  return (
    <>
      <Map
        center={Netherlands}
        zoom={3}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer attribution={attribution} url={tilesUrl} />
        {props.kits.map((kit) => {
          if (kit.latitude != null && kit.longitude != null) {
            const position = [kit.latitude, kit.longitude];

            return (
              <Marker
                key={kit.serial}
                position={position}
                icon={markerIcon}
                onclick={() => props.changeKit(kit.serial)}
                onpopupclose={() => props.changeKit(null)}
              >
                <Popup className={"custom-popup"}>
                  <MarginLogo size={18} color={"dark"} />
                  <KitName>{kit.name}</KitName>
                </Popup>
              </Marker>
            );
          }
        })}
      </Map>
    </>
  );
}

MapBuilder.propTypes = {
  /**
   * Array containing kit objects
   */
  kits: PropTypes.arrayOf(PropTypes.object),
  /**
   * Function to change the selected kit
   */
  changeKit: PropTypes.func,
};

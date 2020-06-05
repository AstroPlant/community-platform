import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

function MapBuilder({ kits }) {
  const Netherlands = [52.1326, 5.2913];

  const locations = [];
  kits.map((kit) => {
    let location = { latitude: kit.latitude, longitude: kit.longitude };
    locations.push(location);
  });
  return (
    <Map
      center={Netherlands}
      zoom={3}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {kits.map((kit) => {
        if (kit.latitude != null && kit.longitude != null) {
          const position = [kit.latitude, kit.longitude];

          return (
            <Marker position={position} key={kit.serial}>
              <Popup>
                <p>{kit.name}</p>
              </Popup>
            </Marker>
          );
        }
      })}
    </Map>
  );
}

export default MapBuilder;

"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import { useState } from "react";
import { mapContainerStyle } from "./mapStyles";
import useCurrentLocation from "./CurrentLocation"
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import DrawControls from "./DrawControls"


function FlyToLocation({ position }) {
  const map = useMap();

  if (position) {
    map.flyTo(position, 15);
  }

  return null;
}
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function LeafletMap() {
  const { location, error } = useCurrentLocation();
  const [currentAddress, setcurrentAddress] = useState("")

  const getAddress = async () => {
    if (!location) {
      console.log("Location is not available yet");
      return;
    }


    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lng}&format=json`
    );
    const res = await response.json();

    setcurrentAddress(res.address.city_district)
    
  };

  return (
    <MapContainer
      center={[28.3949, 84.1240]}
      zoom={13}
      zoomControl={true}
      scrollWheelZoom={false}
      style={mapContainerStyle}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <DrawControls
          position="topright"
          draw={{
            rectangle: true,
            polygon: true,
            polyline: true,
            circle: true,
            marker: true,
            circlemarker: false,
          }}
        />

      {location && (
        <>
          <FlyToLocation position={[location.lat , location.lng]} />
          <Marker position={[location.lat , location.lng]}>


            <Popup>
              <div className="text-sm">         
                {currentAddress === "" ? <button className="cursor-pointer" onClick={getAddress}>Get Address</button>:<p>{currentAddress}</p>}
              </div>
            </Popup>
          </Marker>
        </>
      )}

    </MapContainer>
  );
}

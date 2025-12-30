"use client"
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

export default function DrawControls() {
  const onCreated = (e) => {
    const geoJson = e.layer.toGeoJSON();
    console.log("Created:", geoJson);
  };

  const onEdited = (e) => {
    e.layers.eachLayer((layer) => {
      console.log("Edited:", layer.toGeoJSON());
    });
  };

  const onDeleted = (e) => {
    e.layers.eachLayer((layer) => {
      console.log("Deleted:", layer.toGeoJSON());
    });
  };

  return (
    <FeatureGroup>
      <EditControl
        position="topright"
        onCreated={onCreated}
        onEdited={onEdited}
        onDeleted={onDeleted}
        draw={{
          rectangle: false,
          polygon: false,
          polyline: true,
          circle: false,
          marker: true,
        }}
      />
    </FeatureGroup>
  );
}

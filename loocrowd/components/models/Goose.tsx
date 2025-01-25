import Mappedin, { Model, useMap } from "@mappedin/react-sdk";
import React from "react";

// Coordinates for multiple models
const coordinates = [
  new Mappedin.Coordinate(43.47136361, -80.54520912),
  new Mappedin.Coordinate(43.47136400, -80.54516266),
  new Mappedin.Coordinate(43.47138200, -80.54518266),
  new Mappedin.Coordinate(43.47136200, -80.54519266),
  new Mappedin.Coordinate(43.47135200, -80.54513266),
];

export function Goose() {
  const { mapData } = useMap();

  return (
    <>
      {coordinates.map((coordinate, index) => (
        <Model
          key={index} // Ensure unique keys for each model
          models={mapData.getByType("space").map((space) => ({
            target: coordinate, // Set each model's target to the respective coordinate
            scale: [0.05, 0.05, 0.05],
            rotation: [90, 0, 0],
            opacity: 0.5,
          }))}
          options={{
            url: "/Goose_3D_Model.glb",
          }}
        />
      ))}
    </>
  );
}
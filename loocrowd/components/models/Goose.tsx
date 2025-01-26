import Mappedin, { Model, useMap } from "@mappedin/react-sdk";
import React from "react";

// Function to generate random coordinates within the specified bounds
const generateRandomCoordinates = (
  count: number,
  latMin: number,
  latMax: number,
  lngMin: number,
  lngMax: number
): Mappedin.Coordinate[] => {
  const coordinates: Mappedin.Coordinate[] = [];
  for (let i = 0; i < count; i++) {
    const lat = Math.random() * (latMax - latMin) + latMin;
    const lng = Math.random() * (lngMax - lngMin) + lngMin;
    coordinates.push(new Mappedin.Coordinate(lat, lng));
  }
  return coordinates;
};

export function Goose({ count }: { count: number }) {
  const { mapData } = useMap();

  // Generate random coordinates
  const coordinates = generateRandomCoordinates(
    count,
    43.47134,
    43.47137,
    -80.54525,
    -80.5451
  );

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

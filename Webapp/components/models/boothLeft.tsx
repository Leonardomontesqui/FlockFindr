import Mappedin, { Model, useMap } from "@mappedin/react-sdk";
import React from "react";

// Define fixed coordinates for desks in Symposium
const symposiumCoordinates: Mappedin.Coordinate[] = [
  // Main area desks
  new Mappedin.Coordinate(43.46384542, -80.53277533),
  // Add more coordinates as needed for your specific layout
];

export function BoothLeft ({
  count = 10, // Default to 10 desks if not specified
}: {
  count?: number;
}) {
  const { mapData } = useMap();

  // Select only the requested number of coordinates
  // If more desks are requested than available coordinates, cycle through the coordinates
  const selectedCoordinates = Array(count)
    .fill(null)
    .map((_, index) => symposiumCoordinates[index % symposiumCoordinates.length]);

  return (
    <>
      {selectedCoordinates.map((coordinate, index) => (
        <Model
          key={`desk-${index}`} // Ensure unique keys for each model
          models={({
            target: coordinate,
            scale: [0.0115, 0.02, 0.01], // Maintain same scale as original
            rotation: [90, 120, 0], // Keep random rotation for visual variety
            opacity: 1.0, // Full opacity for desks
          })}
          options={{
            url: "/reworkedBoothLeftV2.glb", // Use the desk model instead of goose
          }}
        />
      ))}
    </>
  );
}
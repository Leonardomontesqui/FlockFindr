import Mappedin, { Model, useMap } from "@mappedin/react-sdk";
import React from "react";

// Define fixed coordinates for stage in Symposium
const seatCoordinates: Mappedin.Coordinate[] = [
  // Main area stage
  new Mappedin.Coordinate(43.46395364, -80.53263155),
];

export function Seats({
  count = 10, // Default to 10 desks if not specified
}: {
  count?: number;
}) {
  const {} = useMap();

  // Select only the requested number of coordinates
  const selectedCoordinates = Array(count)
    .fill(null)
    .map((_, index) => seatCoordinates[index % seatCoordinates.length]);

  return (
    <>
      {selectedCoordinates.map((coordinate, index) => (
        <Model
          key={`desk-${index}`} // Ensure unique keys for each model
          models={{
            target: coordinate,
            scale: [0.8, 0.9, 0.8], // Maintain same scale as original
            // rotation: [90, 30, 0], // Keep random rotation for visual variety
            rotation: [90, -150, 0], // Keep random rotation for visual variety

            opacity: 1.0, // Full opacity for stage
          }}
          options={{
            url: "/seatingArrangement.glb", // Use the stage model instead of goose
          }}
        />
      ))}
    </>
  );
}

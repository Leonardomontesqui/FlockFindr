import Mappedin, { Model, useMap } from "@mappedin/react-sdk";
import React from "react";

// Define fixed coordinates for stage in Symposium
const stageCoordinates: Mappedin.Coordinate[] = [
  // Main area stage
  new Mappedin.Coordinate(43.46373379, -80.53228718),
];

export function Stage ({
  count = 10, // Default to 10 desks if not specified
}: {
  count?: number;
}) {
  const { mapData } = useMap();

  // Select only the requested number of coordinates
  const selectedCoordinates = Array(count)
    .fill(null)
    .map((_, index) => stageCoordinates[index % stageCoordinates.length]);

  return (
    <>
      {selectedCoordinates.map((coordinate, index) => (
        <Model
          key={`desk-${index}`} // Ensure unique keys for each model
          models={({
            target: coordinate,
            scale: [0.008, 0.008, 0.008], // Maintain same scale as original
            // rotation: [90, 30, 0], // Keep random rotation for visual variety
            rotation: [90, -150, 0], // Keep random rotation for visual variety

            opacity: 1.0, // Full opacity for stage
          })}
          options={{
            url: "/reworkedStage.glb", // Use the stage model instead of goose
          }}
        />
      ))}
    </>
  );
}
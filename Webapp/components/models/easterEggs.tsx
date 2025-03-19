import Mappedin, { Model, useMap } from "@mappedin/react-sdk";
import React from "react";

// Define fixed coordinates Easter Eggs in Symposium
const llamaCoordinates: Mappedin.Coordinate[] = [
  // Main area stage
  new Mappedin.Coordinate(43.46375046, -80.53232781),
];

const diceCoordinates: Mappedin.Coordinate[] = [
    // Main area stage
    new Mappedin.Coordinate(43.46376222, -80.53230378),
];

const kingCoordinates: Mappedin.Coordinate[] = [
    // Main area stage
    new Mappedin.Coordinate(43.46376786, -80.53227660),
];

export function EasterEggs ({
  count = 10, // Default to 10 desks if not specified
}: {
  count?: number;
}) {
    const { mapData } = useMap();

    // Select only the requested number of coordinates
    const selectedLlamaCoordinates = Array(count)
    .fill(null)
    .map((_, index) => llamaCoordinates[index % llamaCoordinates.length]);

    const selectedDiceCoordinates = Array(count)
    .fill(null)
    .map((_, index) => diceCoordinates[index % diceCoordinates.length]);

    const selectedKingCoordinates = Array(count)
    .fill(null)
    .map((_, index) => kingCoordinates[index % kingCoordinates.length]);

    return (
    <>
        {selectedLlamaCoordinates.map((coordinate, index) => (
        <Model
            key={`desk-${index}`} // Ensure unique keys for each model
            models={({
            target: coordinate,
            scale: [0.02, 0.02, 0.02], // Maintain same scale as original
            // rotation: [90, 30, 0], // Keep random rotation for visual variety
            rotation: [0, 0, 190], // Keep random rotation for visual variety

            opacity: 1.0, // Full opacity for stage
            })}
            options={{
            url: "/llamaModel.glb", // Use the easter egg model instead of goose
            
            }}
        />
        ))}

        {selectedDiceCoordinates.map((coordinate, index) => (
        <Model
            key={`desk-${index}`} // Ensure unique keys for each model
            models={({
            target: coordinate,
            scale: [0.20, 0.20, 0.20], // Maintain same scale as original
            // rotation: [90, 30, 0], // Keep random rotation for visual variety
            rotation: [90, -150, 0], // Keep random rotation for visual variety

            opacity: 1.0, // Full opacity for stage
            })}
            options={{
            url: "/diceModel.glb", // Use the easter egg model instead of goose
            }}
        />
        ))}

        {selectedKingCoordinates.map((coordinate, index) => (
        <Model
            key={`desk-${index}`} // Ensure unique keys for each model
            models={({
            target: coordinate,
            scale: [0.20, 0.20, 0.20], // Maintain same scale as original
            // rotation: [90, 30, 0], // Keep random rotation for visual variety
            rotation: [0, 180, 0], // Keep random rotation for visual variety

            opacity: 1.0, // Full opacity for stage
            })}
            options={{
            url: "/kingModel.glb", // Use the easter egg model instead of goose
            }}
        />
        ))}
    </>
    );
}
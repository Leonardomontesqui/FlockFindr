import Mappedin, { Model, useMap } from "@mappedin/react-sdk";
import React from "react";

const generateRandomCoordinates = (
  count: number,
  coordinates: Mappedin.Coordinate[]
): Mappedin.Coordinate[] => {
  // Sort coordinates to create a proper bounding box
  const sortedLats = coordinates.map((c) => c.latitude).sort((a, b) => a - b);
  const sortedLngs = coordinates.map((c) => c.longitude).sort((a, b) => a - b);

  const latMin = sortedLats[0];
  const latMax = sortedLats[sortedLats.length - 1];
  const lngMin = sortedLngs[0];
  const lngMax = sortedLngs[sortedLngs.length - 1];

  const randomCoordinates: Mappedin.Coordinate[] = [];

  for (let i = 0; i < count; i++) {
    const lat = latMin + Math.random() * (latMax - latMin);
    const lng = lngMin + Math.random() * (lngMax - lngMin);
    randomCoordinates.push(new Mappedin.Coordinate(lat, lng));
  }

  return randomCoordinates;
};

export function Goose({
  countTims,
  countRCH,
}: {
  countTims: number;
  countRCH: number;
}) {
  const {} = useMap(); //mapData used to be inside the brackets

  // Generate random coordinates
  const coordinatesTims = generateRandomCoordinates(countTims, [
    new Mappedin.Coordinate(43.4713657, -80.54522629),
    new Mappedin.Coordinate(43.47138214, -80.54521374),
    new Mappedin.Coordinate(43.47136213, -80.54512565),
    new Mappedin.Coordinate(43.47134444, -80.54513663),
  ]);

  const coordinatesRCH = generateRandomCoordinates(countRCH, [
    new Mappedin.Coordinate(43.47035868, -80.54058104),
    new Mappedin.Coordinate(43.47040285, -80.54051076),
    new Mappedin.Coordinate(43.470337, -80.54046393),
    new Mappedin.Coordinate(43.47032936, -80.54053556),
  ]);

  return (
    <>
      {coordinatesTims.map((coordinate, index) => (
        <Model
          key={index} // Ensure unique keys for each model
          models={{
            target: coordinate, // Set each model's target to the respective coordinate
            scale: [0.02, 0.02, 0.02],
            rotation: [90, Math.random() * 360, 0],
            opacity: 0.5,
          }}
          options={{
            url: "/finalGoosey.glb",
          }}
        />
      ))}

      {coordinatesRCH.map((coordinate, index) => (
        <Model
          key={index} // Ensure unique keys for each model
          models={{
            target: coordinate, // Set each model's target to the respective coordinate
            scale: [0.02, 0.02, 0.02],
            rotation: [90, Math.random() * 360, 0],
            opacity: 0.5,
          }}
          options={{
            url: "/finalGoosey.glb",
          }}
        />
      ))}
    </>
  );
}

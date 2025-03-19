"use client";
import { createSupabaseClient } from "@/lib/supabase/client";
import { useLocation } from "@/lib/supabase/useLocation";
import { generateRandomCoordinates } from "@/lib/utils/modelsAid";
import Mappedin, { Model, useMap } from "@mappedin/react-sdk";
import React, { useEffect, useState } from "react";
import { useSymposiumCounts } from "@/lib/utils/useSymposiumCounts";
const supabase = createSupabaseClient();
interface CustomerData {
  restaurant: string;
  count: number;
}

export function Goose() {
  const counts = useSymposiumCounts();
  const {} = useMap();

  // Generate random coordinates
  const coordinatesTims = generateRandomCoordinates(counts.Activity, [
    new Mappedin.Coordinate(43.4713657, -80.54522629),
    new Mappedin.Coordinate(43.47138214, -80.54521374),
    new Mappedin.Coordinate(43.47136213, -80.54512565),
    new Mappedin.Coordinate(43.47134444, -80.54513663),
  ]);

  const coordinatesRCH = generateRandomCoordinates(counts.East, [
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

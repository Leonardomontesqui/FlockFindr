"use client";
import { createSupabaseClient } from "@/lib/supabase/client";
import { useLocation } from "@/lib/supabase/useLocation";
import { generateRandomCoordinates, generateRandomCoordinatesWithExclusion } from "@/lib/utils/modelsAid";
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

  // Generate random coordinates for geese in each area
  const coordinatesCourt = generateRandomCoordinatesWithExclusion(counts.Activity, [
    new Mappedin.Coordinate(43.46427750, -80.53206026),
    new Mappedin.Coordinate(43.46433190, -80.53193197),
    new Mappedin.Coordinate(43.46406503, -80.53188115),
    new Mappedin.Coordinate(43.46411976, -80.53175466),
    // exclusion area
    new Mappedin.Coordinate(43.46428243, -80.53199237),
    new Mappedin.Coordinate(43.46429120, -80.53195671),
    new Mappedin.Coordinate(43.46412015, -80.53186673),
    new Mappedin.Coordinate(43.46413905, -80.53182561),
  ]);

  const coordinatesNorth = generateRandomCoordinates(counts.North, [
    new Mappedin.Coordinate(43.46354328, -80.53231267),
    new Mappedin.Coordinate(43.46363906, -80.53206527),
    new Mappedin.Coordinate(43.46348033, -80.53224544),
    new Mappedin.Coordinate(43.46359297, -80.53198514),
  ]);

  const coordinatesWest = generateRandomCoordinates(counts.West, [
    new Mappedin.Coordinate(43.46407768, -80.53229134),
    new Mappedin.Coordinate(43.46412370, -80.53222589),
    new Mappedin.Coordinate(43.46376778, -80.53203822),
    new Mappedin.Coordinate(43.46380651, -80.53193668),
  ]);

  const coordinatesEast = generateRandomCoordinates(counts.East, [
    new Mappedin.Coordinate(43.46374484, -80.53266608),
    new Mappedin.Coordinate(43.46376014, -80.53257541),
    new Mappedin.Coordinate(43.46356915, -80.53251891),
    new Mappedin.Coordinate(43.46360930, -80.53243574),
  ]);

  return (
    <>
      {coordinatesCourt.map((coordinate, index) => (
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

      {coordinatesNorth.map((coordinate, index) => (
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

      {coordinatesWest.map((coordinate, index) => (
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

      {coordinatesEast.map((coordinate, index) => (
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

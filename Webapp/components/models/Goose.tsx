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

  // Generate random coordinates
  const coordinatesCourt = generateRandomCoordinatesWithExclusion(counts.Activity, [
    new Mappedin.Coordinate(43.46427750, -80.53206026),
    new Mappedin.Coordinate(43.46433190, -80.53193197),
    new Mappedin.Coordinate(43.46406503, -80.53188115),
    new Mappedin.Coordinate(43.46411976, -80.53175466),
    // exclusion area
    new Mappedin.Coordinate(43.46428459, -80.53200792),
    new Mappedin.Coordinate(43.46431005, -80.53197219),
    new Mappedin.Coordinate(43.46414395, -80.53182199),
    new Mappedin.Coordinate(43.46410850, -80.53185257),
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
    </>
  );
}

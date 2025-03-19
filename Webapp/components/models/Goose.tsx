"use client";
import { createSupabaseClient } from "@/lib/supabase/client";
import { useLocation } from "@/lib/supabase/useLocation";
import {
  generateRandomCoordinates,
  generateRandomCoordinatesWithExclusion,
} from "@/lib/utils/modelsAid";
import Mappedin, { Model, useMap } from "@mappedin/react-sdk";
import React, { useEffect, useState } from "react";

interface SymposiumData {
  location: string;
  count: number;
}

interface Counts {
  Activity: number;
  East: number;
  West: number;
  North: number;
}

const supabase = createSupabaseClient();

export function useSymposiumCounts() {
  const { getLatestCount } = useLocation();
  const [counts, setCounts] = useState<Counts>({
    Activity: 0,
    East: 0,
    West: 0,
    North: 0,
  });

  useEffect(() => {
    console.log("Setting up initial data fetch and subscription...");

    // Initial data fetch
    Promise.all([
      getLatestCount("Activity"),
      getLatestCount("East"),
      getLatestCount("West"),
      getLatestCount("North"),
    ]).then(([activity, east, west, north]) => {
      console.log("Initial data fetched:", { activity, east, west, north });
      setCounts({
        Activity: activity[0].count,
        East: east[0].count,
        West: west[0].count,
        North: north[0].count,
      });
    });

    // Set up real-time subscription
    const channel = supabase
      .channel("symposium-updates")
      .on(
        "postgres_changes",
        {
          event: "UPDATE", // Listen to all events (INSERT, UPDATE, DELETE)
          schema: "public",
          table: "Symposium",
          filter: `location=in.(Activity,East,West,North)`,
        },
        (payload) => {
          console.log("Received real-time update:", payload);
          const updatedData: SymposiumData = payload.new as SymposiumData;
          console.log("Updating counts with:", updatedData);
          setCounts((prevCounts) => {
            const newCounts = {
              ...prevCounts,
              [updatedData.location]: updatedData.count,
            };
            console.log("New counts state:", newCounts);
            return newCounts;
          });
        }
      )
      .subscribe((status) => {
        console.log("Subscription status:", status);
      });

    // Cleanup subscription
    return () => {
      console.log("Cleaning up subscription...");
      supabase.removeChannel(channel);
    };
  }, [getLatestCount]); // Need to include getLatestCount as it's used in the effect

  return counts;
}

export function Goose() {
  const counts = useSymposiumCounts();
  const {} = useMap();

  // Generate random coordinates for geese in each area
  const coordinatesCourt = generateRandomCoordinatesWithExclusion(
    counts.Activity,
    [
      new Mappedin.Coordinate(43.4642775, -80.53206026),
      new Mappedin.Coordinate(43.4643319, -80.53193197),
      new Mappedin.Coordinate(43.46406503, -80.53188115),
      new Mappedin.Coordinate(43.46411976, -80.53175466),
      // exclusion area
      new Mappedin.Coordinate(43.46428243, -80.53199237),
      new Mappedin.Coordinate(43.4642912, -80.53195671),
      new Mappedin.Coordinate(43.46412015, -80.53186673),
      new Mappedin.Coordinate(43.46413905, -80.53182561),
    ]
  );

  const coordinatesNorth = generateRandomCoordinates(counts.North, [
    new Mappedin.Coordinate(43.46354328, -80.53231267),
    new Mappedin.Coordinate(43.46363906, -80.53206527),
    new Mappedin.Coordinate(43.46348033, -80.53224544),
    new Mappedin.Coordinate(43.46359297, -80.53198514),
  ]);

  const coordinatesWest = generateRandomCoordinates(counts.West, [
    new Mappedin.Coordinate(43.46407768, -80.53229134),
    new Mappedin.Coordinate(43.4641237, -80.53222589),
    new Mappedin.Coordinate(43.46376778, -80.53203822),
    new Mappedin.Coordinate(43.46380651, -80.53193668),
  ]);

  const coordinatesEast = generateRandomCoordinates(counts.East, [
    new Mappedin.Coordinate(43.46374484, -80.53266608),
    new Mappedin.Coordinate(43.46376014, -80.53257541),
    new Mappedin.Coordinate(43.46356915, -80.53251891),
    new Mappedin.Coordinate(43.4636093, -80.53243574),
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

"use client";
import { createSupabaseClient } from "@/lib/supabase/client";
import { useLocation } from "@/lib/supabase/useLocation";
import { generateRandomCoordinates } from "@/lib/utils/modelsAid";
import Mappedin, { Model, useMap } from "@mappedin/react-sdk";
import React, { useEffect, useState } from "react";
const supabase = createSupabaseClient();
interface CustomerData {
  restaurant: string;
  count: number;
}

export function Goose() {
  const { getLatestCount } = useLocation();
  const {} = useMap(); //mapData used to be inside the brackets

  const [countActivityCourt, setCountActivityCourt] = useState<number>(0); // Initialize count
  const [countEastTrack, setCountEastTrack] = useState<number>(0);
  const [countWestTrack, setCountWestTrack] = useState<number>(0);
  const [countNorthTrack, setCountNorthTrack] = useState<number>(0);

  useEffect(() => {
    getLatestCount("Activity").then((data) =>
      setCountActivityCourt(data[0].count)
    );
    getLatestCount("East").then((data) => setCountEastTrack(data[0].count));

    getLatestCount("West").then((data) => setCountWestTrack(data[0].count));
    getLatestCount("North").then((data) => setCountNorthTrack(data[0].count));

    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT", //from updated
          schema: "public",
          table: "customersRealTime", //new db
        },
        (payload) => {
          const updatedData: CustomerData = payload.new as CustomerData;
          if (updatedData.restaurant === "Timmies") {
            setCountActivityCourt(updatedData.count);
          } else if (updatedData.restaurant === "RCH") {
            setCountEastTrack(updatedData.count);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Generate random coordinates
  const coordinatesTims = generateRandomCoordinates(countActivityCourt, [
    new Mappedin.Coordinate(43.4713657, -80.54522629),
    new Mappedin.Coordinate(43.47138214, -80.54521374),
    new Mappedin.Coordinate(43.47136213, -80.54512565),
    new Mappedin.Coordinate(43.47134444, -80.54513663),
  ]);

  const coordinatesRCH = generateRandomCoordinates(countEastTrack, [
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

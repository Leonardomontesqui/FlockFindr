"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import MenuDesktop from "@/components/home/MenuDesktop";
import MenuMobile from "@/components/home/MenuMobile";
import { MapView, useMapData } from "@mappedin/react-sdk";
import { createSupabaseClient } from "@/lib/supabase/client";
import { Goose } from "@/components/models/Goose";
import { BoothWest } from "@/components/models/boothWest";
import { BoothEast } from "@/components/models/boothEast";
import { BoothNorth } from "@/components/models/boothNorth";
import { BoothCourt } from "@/components/models/boothCourt";
import { Stage } from "@/components/models/Stage";
import { Seats } from "@/components/models/seatingArrangement";

const options = {
  key: process.env.NEXT_PUBLIC_MAPPEDIN_KEY,
  secret: process.env.NEXT_PUBLIC_MAPPEDIN_SECRET!,
  mapId: "67d215bbebd59f000b48850f",
};

export default function Home() {
  const isMobile = useMediaQuery({ maxWidth: 768 }); // Breakpoint at 768px
  const { isLoading, error, mapData } = useMapData(options);

  if (isLoading || !mapData) return <div>Loading...</div>; // TODO: add a loading screen

  if (error) return <div>Error: {error.message}</div>;

  const handleMapLoad = (mapView: any) => {
    mapView.Camera.set({
      bearing: 190,
      pitch: 50,
      zoomLevel: 18.6,
      center: [43.46488819, -80.53211819], // Use a default coordinate
    });

    mapView.Outdoor.setStyle(
      "https://tiles-cdn.mappedin.com/styles/freshmint/style.json"
    );

    mapView.Labels.all();
  };

  return (
    <div className="h-screen w-full">
      <MapView mapData={mapData} onLoad={handleMapLoad}>
        {isMobile ? <MenuMobile /> : <MenuDesktop />}
        <Goose />
        <BoothWest />
        <BoothEast />
        <BoothNorth />
        <BoothCourt />
        <Stage />
        <Seats />
      </MapView>
    </div>
  );
}

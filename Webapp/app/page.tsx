"use client";

import { useEffect, useState } from "react";
import Menu from "@/components/home/Menu";
import { MapView, useMapData } from "@mappedin/react-sdk";
import { createSupabaseClient } from "@/lib/supabase/client";
import { Goose } from "@/components/models/Goose";
import { BoothRight } from "@/components/models/boothRight";
import { BoothLeft } from "@/components/models/boothLeft";
import { BoothDown } from "@/components/models/boothDown";
import { BoothCourt } from "@/components/models/boothCourt";
import { Stage } from "@/components/models/Stage";

const options = {
  key: process.env.NEXT_PUBLIC_MAPPEDIN_KEY,
  secret: process.env.NEXT_PUBLIC_MAPPEDIN_SECRET!,
  mapId: "67d215bbebd59f000b48850f",
};

export default function Home() {
  const { isLoading, error, mapData } = useMapData(options);

  if (isLoading || !mapData) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <MapView mapData={mapData}>
      <Menu />
      <Goose />
      <BoothRight />
      <BoothLeft />
      <BoothDown />
      <BoothCourt />
      <Stage />
    </MapView>
  );
}

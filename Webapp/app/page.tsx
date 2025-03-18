"use client"

import { useEffect, useState } from "react";
import Menu from "@/components/home/Menu";
import { MapView, useMapData } from "@mappedin/react-sdk";
import { useRestaurant } from "@/lib/supabase/useRestaurant";
import { createSupabaseClient } from "@/lib/supabase/client";
import { Goose } from "@/components/models/Goose";
import { BoothWest } from "@/components/models/boothWest";
import { BoothEast } from "@/components/models/boothEast";
import { BoothNorth } from "@/components/models/boothNorth";
import { BoothCourt } from "@/components/models/boothCourt";
import { Stage } from "@/components/models/Stage";

const supabase = createSupabaseClient();
interface CustomerData {
  restaurant: string;
  count: number;
}
const options = {
  key: process.env.NEXT_PUBLIC_MAPPEDIN_KEY,
  secret: process.env.NEXT_PUBLIC_MAPPEDIN_SECRET!,
  mapId: "67d215bbebd59f000b48850f",
};

export default function Home() {
  const { getLatestCustomersTims, getLatestRCH } = useRestaurant();
  const [countTims, setCountTims] = useState<number>(0); // Initialize count
  const [countRCH, setCountRCH] = useState<number>(0);

  const { isLoading, error, mapData } = useMapData(options);

  useEffect(() => {
    getLatestCustomersTims().then((data) => setCountTims(data[0].count));
    getLatestRCH().then((data) => setCountRCH(data[0].count));
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
            setCountTims(updatedData.count);
          } else if (updatedData.restaurant === "RCH") {
            setCountRCH(updatedData.count);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (isLoading || !mapData) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  const handleMapLoad = (mapView) => {
    mapView.Camera.set({ 
      bearing: 190, 
      pitch: 50, 
      zoomLevel: 18.6, 
      center: [43.46488819, -80.53211819], // Use a default coordinate
    });
  };

  return (
    <MapView 
      mapData={mapData}
      onLoad={handleMapLoad}
    >
      <Menu />
      <Goose countTims={countTims} countRCH={countRCH} />
      <BoothWest />
      <BoothEast />
      <BoothNorth />
      <BoothCourt />
      <Stage />
    </MapView>
  );
}
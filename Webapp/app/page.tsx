"use client";

import { useEffect, useState } from "react";
import Menu from "@/components/home/Menu";
import Graph from "@/components/home/Graph";
import { MapView, useMapData, useMap, Label } from "@mappedin/react-sdk";
// import "@mappedin/mappedin-js/lib/index.css";
import { useRestaurant } from "@/lib/supabase/useRestaurant";
import { createSupabaseClient } from "@/lib/supabase/client";
import { Goose } from "@/components/models/Goose";

const supabase = createSupabaseClient();
interface CustomerData {
  restaurant: string;
  count: number;
}
const options = {
  key: process.env.NEXT_PUBLIC_MAPPEDIN_KEY,
  secret: process.env.NEXT_PUBLIC_MAPPEDIN_SECRET!,
  mapId: "673531dfeadd0a000b15f06c",
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
        (payload: any) => {
          console.log("Received payload:", payload);
          const updatedData: CustomerData = payload.new;
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

  return (
    <MapView mapData={mapData}>
      <Menu />
      <Graph />
      <Goose countTims={countTims} countRCH={countRCH} />
    </MapView>
  );
}

"use client";

import { useEffect, useState } from "react";
import Menu from "@/components/home/Menu";
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
  const { getLatestCustomers } = useRestaurant();
  const [count, setCount] = useState<number>(0); // Initialize count

  const { isLoading, error, mapData } = useMapData(options);

  useEffect(() => {
    getLatestCustomers().then((data) => setCount(data[0].count));

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
          setCount(updatedData.count);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <MapView mapData={mapData}>
      <Menu />
      <Goose />
    </MapView>
  );
}

"use client";
import { createSupabaseClient } from "@/lib/supabase/client";
import React, { useEffect, useState } from "react";
import { useLocation } from "@/lib/supabase/useLocation";
import Mappedin, { useMap } from "@mappedin/react-sdk";
import Image from "next/image";
import { PeopleChip } from "../ui/chip";
import { ArrowRight, X } from "lucide-react";

const supabase = createSupabaseClient();
interface CustomerData {
  restaurant: string;
  count: number;
}

export default function Menu() {
  const { getLatestCount } = useLocation();
  const { mapView } = useMap();
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

  function go(coordinate: Mappedin.Coordinate) {
    mapView.Camera.focusOn(coordinate);
  }
  return (
    <div className="absolute top-4 left-4 right-4 z-50 flex h-[70px] gap-2 p-4 p-6  border rounded-full bg-[#F4EFE3] border-[#D0CABA] shadow-lg items-center justify-between">
      <div className="flex gap-3 items-center">
        <div className="flex gap-1 items-center">
          <Image
            src={"/SocraticaLogo.png"}
            width={50}
            height={50}
            alt="Socratica logo"
          />
          <h1
            className="font-times font-normal"
            style={{
              fontFamily: "Times New Roman, Times, serif",
              fontSize: "24px",
            }}
          >
            Socratica
          </h1>
        </div>
        <X />
        <h1 className="text-[24px]">FlockFindr</h1>
      </div>

      <div className="flex gap-8 items-center">
        <div className="flex gap-2 items-center">
          <PeopleChip count={countActivityCourt} primaryColor="orange" />
          <p className="font-medium">Hockey Rink</p>
          <ArrowRight
            onClick={() =>
              go(new Mappedin.Coordinate(43.47136597, -80.5452103))
            }
          />
        </div>
        <div className="flex gap-2 items-center">
          <PeopleChip count={countEastTrack} primaryColor="blue" />
          <p className="font-medium">Basketball Arena</p>
          <ArrowRight
            onClick={() => go(new Mappedin.Coordinate(43.4703, -80.5405))}
          />
        </div>
      </div>
    </div>
  );
}

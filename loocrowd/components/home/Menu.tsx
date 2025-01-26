"use client";
import { createSupabaseClient } from "@/lib/supabase/client";
import React, { useEffect, useState } from "react";
import { useRestaurant } from "@/lib/supabase/useRestaurant";
import { PersonStanding } from "lucide-react";
import Mappedin, { useMap } from "@mappedin/react-sdk";

const supabase = createSupabaseClient();
interface CustomerData {
  restaurant: string;
  count: number;
}

function GooseLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      id="grey-goose"
      className="w-[60px] h-[60px]"
    >
      <path
        fill="#9E9E9E"
        d="M20.1 15.598c-1.704-.37-2.209.697-2.625 1.056-.376.329-1.771.502-2.672.684.251-.429.596-.822.973-1.252.502-.573 1.021-1.166 1.423-1.976 1.476-3.526 1.053-3.685 1.854-4.864.525-.654-.063-1.704-1.459-.195-.234-.115-.573.054-.687.284-.549 1.119-4.686 6.15-5.468 6.623-1.207-.9-8.175-11.975-7.54-15.309.114-.58-.935-1.397-1.391.731-.21-.246-.642-.238-.826.005-.267.352-.198 1.598-.056 2.285-.191.552-.153 2.03.263 2.95-.325 1.24.397 2.942 1.078 4.007-.18 2.873 2.688 4.005 3.126 7.794.01.08.038.157.084.225.019.026.382.552 1.067 1.105-.772.939-1.676 2.135-2.133 2.232a.527.527 0 0 0-.517.515c0 .624 1.817 1.491 3.607 1.491 3.105 0 5.594-1.937 7.594-3.493 1.104-.859 2.149-1.673 3.051-1.963.761-.029 1.609-.468 2.118-1.072.348-.24 1.534-.344 1.534-1.069.002-.907-.884-.474-2.398-.794z"
      ></path>
    </svg>
  );
}

function PeopleChip({ count }: { count: number }) {
  return (
    <div
      className={`px-2 py-1 gap-2 flex rounded-lg items-center justify-center text-2xl w-[100px] bg-[#038BF5] text-white border border-[#007DDF]`}
    >
      <PersonStanding size={30} />
      <p className="font-semibold">{count}</p>
    </div>
  );
}

export default function Menu() {
  const { getLatestCustomersTims, getLatestRCH } = useRestaurant();
  const { mapView } = useMap();
  const [countTims, setCountTims] = useState<number>(0); // Initialize count
  const [countRCH, setCountRCH] = useState<number>(0); // Initialize count
  const [time, setTime] = useState<string>("00:00");

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

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const currentTime = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Toronto",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(now);
      setTime(currentTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  function go(coordinate: Mappedin.Coordinate) {
    mapView.Camera.focusOn(coordinate);
  }
  return (
    <div className="absolute top-4 left-4 z-50 flex flex-col gap-2 p-4 pt-6  border w-fit rounded-lg bg-[#ffffff] border-[#D7D7D7] shadow-lg">
      <div className="flex gap-3 place-items-baseline">
        <GooseLogo />
        <h1 className="text-[50px] text-[#646363] font-medium mb-1">{time}</h1>
      </div>

      <h2 className="text-[#646363]">Fly me to ...</h2>
      <section className="flex flex-col gap-4">
        <div className="flex gap-4">
          <button
            className="p-1 bg-[#E5E5E5] hover:bg-[#DFDFDF] w-20 border border-[#C2C2C2] rounded-lg"
            onClick={() =>
              go(new Mappedin.Coordinate(43.47136597, -80.5452103))
            }
          >
            SLC
          </button>
          <PeopleChip count={countTims} />
        </div>
        <div className="flex gap-4">
          <button
            className="p-1 bg-[#E5E5E5] hover:bg-[#DFDFDF] w-20 border border-[#C2C2C2] rounded-lg"
            onClick={() => go(new Mappedin.Coordinate(43.4703, -80.5405))}
          >
            RCH
          </button>
          <PeopleChip count={countRCH} />
        </div>
      </section>
      <h1 className="text-[#E5E5E5] mx-auto font-medium mt-4 text-[30px]">
        FlockFinder
      </h1>
    </div>
  );
}

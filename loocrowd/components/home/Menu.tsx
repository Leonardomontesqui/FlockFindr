"use client";
import { createSupabaseClient } from "@/lib/supabase/client";
import React, { useEffect, useState } from "react";
import Restaurant from "../ui/RestaurantChip";
import { useRestaurant } from "@/lib/supabase/useRestaurant";

const supabase = createSupabaseClient();
interface CustomerData {
  restaurant: string;
  count: number;
}
//bg-[#f8f8f8]

export default function Menu() {
  const { getLatestCustomers } = useRestaurant();
  const [count, setCount] = useState<number>(0); // Initialize count
  const [time, setTime] = useState<string>("00:00");

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
  return (
    <div>
      <div className="absolute top-4 left-4 z-50 flex flex-col gap-2 p-6 pt-4  border w-fit rounded-lg bg-[#f8f8f8] border-[#cbcbcb]">
        <div className="flex place-items-baseline gap-3">
          <h1 className="font-mono text-[45px]">{time}</h1>
          <h2 className="font-mono text-[40px] text-[#C20032]">iwantTimmies</h2>
        </div>

        <Restaurant
          key={"Tim Hortons SLC"}
          name={"Tim Hortons SLC"}
          times={"10:00 - 19:30"}
          count={count}
        />
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { createSupabaseClient } from "@/lib/supabase/client";
import { useLocation } from "@/lib/supabase/useLocation";

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
    Promise.all([
      getLatestCount("Activity"),
      getLatestCount("East"),
      getLatestCount("West"),
      getLatestCount("North"),
    ]).then(([activity, east, west, north]) => {
      setCounts({
        Activity: activity[0].count,
        East: east[0].count,
        West: west[0].count,
        North: north[0].count,
      });
    });

    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "Symposium",
        },
        (payload) => {
          const updatedData: SymposiumData = payload.new as SymposiumData;
          setCounts((prevCounts) => ({
            ...prevCounts,
            [updatedData.location]: updatedData.count,
          }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []); // Empty dependency array since supabase client is stable

  return counts;
}

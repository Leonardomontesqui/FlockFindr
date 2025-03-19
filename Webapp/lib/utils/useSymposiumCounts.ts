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
    console.log("Setting up initial data fetch and subscription...");

    // Initial data fetch
    Promise.all([
      getLatestCount("Activity"),
      getLatestCount("East"),
      getLatestCount("West"),
      getLatestCount("North"),
    ]).then(([activity, east, west, north]) => {
      console.log("Initial data fetched:", { activity, east, west, north });
      setCounts({
        Activity: activity[0].count,
        East: east[0].count,
        West: west[0].count,
        North: north[0].count,
      });
    });

    // Set up real-time subscription
    const channel = supabase
      .channel("symposium-updates")
      .on(
        "postgres_changes",
        {
          event: "*", // Listen to all events (INSERT, UPDATE, DELETE)
          schema: "public",
          table: "Symposium",
          filter: `location=in.(Activity,East,West,North)`,
        },
        (payload) => {
          console.log("Received real-time update:", payload);
          const updatedData: SymposiumData = payload.new as SymposiumData;
          console.log("Updating counts with:", updatedData);
          setCounts((prevCounts) => {
            const newCounts = {
              ...prevCounts,
              [updatedData.location]: updatedData.count,
            };
            console.log("New counts state:", newCounts);
            return newCounts;
          });
        }
      )
      .subscribe((status) => {
        console.log("Subscription status:", status);
      });

    // Cleanup subscription
    return () => {
      console.log("Cleaning up subscription...");
      supabase.removeChannel(channel);
    };
  }, [getLatestCount]); // Need to include getLatestCount as it's used in the effect

  return counts;
}

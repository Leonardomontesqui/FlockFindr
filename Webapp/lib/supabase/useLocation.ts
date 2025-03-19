import { createSupabaseClient } from "./client";
import { useCallback } from "react";

const supabase = createSupabaseClient();

// Debug function to check table structure
const checkTableStructure = async () => {
  try {
    console.log("Checking table structure...");

    // First, check if we can query the table
    const { data: tableData, error: tableError } = await supabase
      .from("Symposium")
      .select("*")
      .limit(1);

    if (tableError) {
      console.error("Error querying table:", tableError);
    } else {
      console.log("Table data sample:", tableData);
    }

    // Check if real-time is enabled for this table
    const channel = supabase
      .channel("table-test")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Symposium",
        },
        (payload) => {
          console.log("Test subscription received payload:", payload);
        }
      )
      .subscribe((status) => {
        console.log("Test subscription status:", status);
      });

    // Clean up test subscription after 5 seconds
    setTimeout(() => {
      supabase.removeChannel(channel);
      console.log("Test subscription cleaned up");
    }, 5000);
  } catch (e) {
    console.error("Error checking table structure:", e);
  }
};

// Call it immediately to check
checkTableStructure();

export const useLocation = () => {
  const getLatestCount = useCallback(async (location: string) => {
    console.log("Attempting to fetch data for location:", location);
    try {
      const { data, error } = await supabase
        .from("Symposium")
        .select("count")
        .eq("location", location);

      console.log("Query response:", { data, error });

      if (error || !data) {
        throw new Error(
          `Failed to get latest customer data at ${location}: ${error?.message}`
        );
      }

      return data;
    } catch (e) {
      console.error("Supabase query error:", e);
      throw e;
    }
  }, []); // Empty dependency array since supabase client is stable

  return { getLatestCount };
};

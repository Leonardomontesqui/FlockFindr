import { createSupabaseClient } from "./client";
import { useCallback } from "react";

const supabase = createSupabaseClient();

// Debug function to check table structure
const checkTableStructure = async () => {
  try {
    console.log("Checking table structure...");
    const { data, error } = await supabase
      .from("Symposium")
      .select("*")
      .limit(1);

    if (error) {
      console.error("Error checking table:", error);
    } else {
      console.log("Table structure:", data);
    }
  } catch (e) {
    console.error("Error checking table structure:", e);
  }
};

// Call it immediately to check
checkTableStructure();

export const useLocation = () => {
  const getLatestCount = async (location: string) => {
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
  };

  return { getLatestCount };
};

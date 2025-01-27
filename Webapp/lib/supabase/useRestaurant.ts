import { createSupabaseClient } from "./client";

const supabase = createSupabaseClient();

export const useRestaurant = () => {
  async function getLatestCustomersTims() {
    const { data, error } = await supabase
      .from("customersRealTime")
      .select("count")
      .eq("restaurant", "Timmies")
      .order("created_at", { ascending: false });

    if (error || !data) {
      throw new Error("Failed to get latest customer data");
    }

    return data;
  }

  return { getLatestCustomersTims, getLatestRCH };
};

async function getLatestRCH() {
  const { data, error } = await supabase
    .from("customersRealTime")
    .select("count")
    .eq("restaurant", "RCH")
    .order("created_at", { ascending: false });

  if (error || !data) {
    throw new Error("Failed to get latest customer data");
  }

  return data;
}

export const fetchRecentTimes = async (NAME: string) => {
  const { data: customersRealTime, error } = await supabase
    .from("customersRealTime")
    .select("created_at")
    .eq("restaurant", NAME)
    .order("created_at", { ascending: false })
    .limit(10);

  if (error || !customersRealTime) {
    throw new Error("Failed to get latest time data");
  }

  const createdAtArray = customersRealTime.map(
    (item) =>
      item.created_at.slice(0, item.created_at.indexOf("T")) +
      " " +
      item.created_at.slice(
        item.created_at.indexOf("T") + 1,
        item.created_at.indexOf(".")
      )
  );

  return createdAtArray;
};

export const fetchRecentCounts = async (NAME: string) => {
  const { data: customersRealTime, error } = await supabase
    .from("customersRealTime")
    .select("count")
    .eq("restaurant", NAME)
    .order("count", { ascending: false })
    .limit(10);

  if (error || !customersRealTime) {
    throw new Error("Failed to get latest count data");
  }

  const countArray = customersRealTime.map((item) => item.count);

  return countArray;
};

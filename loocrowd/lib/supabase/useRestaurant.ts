import { createSupabaseClient } from "./client";

const supabase = createSupabaseClient();

export const useRestaurant = () => {
  async function getLatestCustomers() {
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

  return { getLatestCustomers };
};

export const fetchRecentTimes = async () => {
  const { data : customersRealTime, error } = await supabase
    .from('customersRealTime')
    .select('created_at')
    .range(0, 9)

  if (error) {
    throw new Error("Failed to get latest time data");
  }

  const createdAtArray = customersRealTime.map((item) => item.created_at);
  console.log(createdAtArray);

  return createdAtArray;
}


export const fetchRecentCounts = async () => {
  const { data : customersRealTime, error } = await supabase
    .from('customersRealTime')
    .select('count')
    .range(0, 9)

  if (error) {
    throw new Error("Failed to get latest count data");
  }

  const countArray = customersRealTime.map((item) => item.count);
  console.log(countArray);

  return countArray;
}
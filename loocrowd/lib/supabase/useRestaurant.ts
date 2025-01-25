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

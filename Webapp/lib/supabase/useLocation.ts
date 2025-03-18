import { createSupabaseClient } from "./client";

const supabase = createSupabaseClient();

export const useLocation = () => {
  const getLatestCount = async (location: string) => {
    const { data, error } = await supabase
      .from("Symposium")
      .select("count")
      .eq("location", location);

    if (error || !data) {
      throw new Error(
        `Failed to get latest customer data at ${location}: ${error.message}`
      );
    }

    return data;
  };

  return { getLatestCount };
};

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useSpendingAnalytics = () => {
  return useQuery({
    queryKey: ["spending-analytics"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("spending_analytics")
        .select("*")
        .eq("user_id", user.id)
        .order("month", { ascending: false })
        .limit(6);

      if (error) throw error;
      return data;
    },
  });
};

export const useCategoryBreakdown = () => {
  return useQuery({
    queryKey: ["category-breakdown"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("subscriptions")
        .select("category, amount")
        .eq("user_id", user.id)
        .eq("is_active", true);

      if (error) throw error;

      // Calculate category totals
      const categoryTotals = data.reduce((acc: Record<string, number>, sub) => {
        acc[sub.category] = (acc[sub.category] || 0) + sub.amount;
        return acc;
      }, {} as Record<string, number>);

      const total = Object.values(categoryTotals).reduce((sum: number, val: number) => sum + val, 0);

      return Object.entries(categoryTotals).map(([category, amount]) => ({
        category,
        amount: amount as number,
        percentage: total > 0 ? Math.round(((amount as number) / total) * 100) : 0,
      }));
    },
  });
};

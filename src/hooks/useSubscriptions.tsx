import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  category: string;
  next_renewal: string;
  cycle: string;
  is_active: boolean;
  payment_method?: string;
  notes?: string;
}

export const useSubscriptions = () => {
  return useQuery({
    queryKey: ["subscriptions"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("is_active", true)
        .order("next_renewal", { ascending: true });

      if (error) throw error;
      return data as Subscription[];
    },
  });
};

export const useMonthlySpending = () => {
  return useQuery({
    queryKey: ["monthly-spending"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase.rpc("calculate_monthly_spending");

      if (error) throw error;
      return data as number;
    },
  });
};

export const useExpiringSubscriptions = (daysAhead: number = 7) => {
  return useQuery({
    queryKey: ["expiring-subscriptions", daysAhead],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_expiring_subscriptions", {
        days_ahead: daysAhead,
      });

      if (error) throw error;
      return data as Array<{
        subscription_id: string;
        user_id: string;
        name: string;
        amount: number;
        next_renewal: string;
        days_left: number;
      }>;
    },
  });
};

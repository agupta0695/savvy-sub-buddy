import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Alert {
  id: string;
  subscription_id: string;
  alert_type: string;
  alert_date: string;
  status: string;
  action_taken: string | null;
  subscription: {
    name: string;
    amount: number;
    category: string;
    next_renewal: string;
  };
}

export const useAlerts = (filter: string = "All") => {
  return useQuery({
    queryKey: ["alerts", filter],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      let query = supabase
        .from("alerts")
        .select(`
          *,
          subscription:subscriptions(name, amount, category, next_renewal)
        `)
        .eq("user_id", user.id)
        .eq("status", "pending");

      if (filter === "Critical") {
        query = query.eq("alert_type", "critical");
      } else if (filter === "Warning") {
        query = query.eq("alert_type", "warning");
      }

      const { data, error } = await query;

      if (error) throw error;
      
      // Sort by days left (ascending) - most urgent first
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset to start of day for accurate calculation
      
      const sortedData = (data as unknown as Alert[]).sort((a, b) => {
        const renewalA = new Date(a.subscription.next_renewal);
        renewalA.setHours(0, 0, 0, 0);
        const renewalB = new Date(b.subscription.next_renewal);
        renewalB.setHours(0, 0, 0, 0);
        
        const daysLeftA = Math.ceil((renewalA.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        const daysLeftB = Math.ceil((renewalB.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        
        return daysLeftA - daysLeftB;
      });
      
      return sortedData;
    },
  });
};

export const useUpdateAlert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ alertId, action }: { alertId: string; action: string }) => {
      const { error } = await supabase
        .from("alerts")
        .update({
          status: "resolved",
          action_taken: action,
        })
        .eq("id", alertId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
    },
  });
};

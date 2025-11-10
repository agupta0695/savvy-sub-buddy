import { ArrowLeft, Edit, ExternalLink, Trash2, MoreVertical } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const categoryIcons: Record<string, string> = {
  Entertainment: "🎬",
  Fitness: "💪",
  Software: "🎨",
  Shopping: "🛍️",
  Food: "🍔",
  Other: "📦",
};

const SubscriptionDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: subscription, isLoading } = useQuery({
    queryKey: ["subscription", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const deleteSubscription = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("subscriptions")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      toast({
        title: "Subscription deleted",
        description: "The subscription has been removed.",
      });
      navigate("/dashboard");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete subscription",
        variant: "destructive",
      });
    },
  });

  const getDaysLeft = (nextRenewal: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset to start of day for accurate calculation
    const renewalDate = new Date(nextRenewal);
    renewalDate.setHours(0, 0, 0, 0); // Reset to start of day
    const diffTime = renewalDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 bg-background border-b border-border px-6 py-4">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold">Subscription Details</h1>
            <div className="w-10" />
          </div>
        </header>
        <main className="max-w-2xl mx-auto px-6 py-8 space-y-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-64 w-full" />
        </main>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Subscription not found</p>
          <Button onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
        </div>
      </div>
    );
  }

  const daysLeft = getDaysLeft(subscription.next_renewal);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 bg-background border-b border-border px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">Subscription Details</h1>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <MoreVertical className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8 space-y-6">
        {/* Icon & Name */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-4xl">
            {categoryIcons[subscription.category] || categoryIcons.Other}
          </div>
          <h2 className="text-2xl font-bold">{subscription.name}</h2>
        </div>

        {/* Countdown Card */}
        <div className={`${daysLeft <= 7 ? 'bg-accent/10 border-2 border-accent' : 'bg-primary/10 border-2 border-primary'} rounded-2xl p-6 text-center`}>
          <div className={`text-4xl font-bold ${daysLeft <= 7 ? 'text-accent' : 'text-primary'} mb-2`}>
            {daysLeft} day{daysLeft !== 1 ? 's' : ''}
          </div>
          <p className="text-muted-foreground">until renewal</p>
        </div>

        {/* Info Cards */}
        <div className="space-y-3">
          <div className="card-glass">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Amount</span>
              <span className="text-xl font-bold">
                ₹{subscription.amount.toLocaleString("en-IN")}/{subscription.cycle}
              </span>
            </div>
          </div>

          <div className="card-glass">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Next Renewal</span>
              <span className="font-semibold">{formatDate(subscription.next_renewal)}</span>
            </div>
          </div>

          <div className="card-glass">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Category</span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-medium">
                {subscription.category}
              </span>
            </div>
          </div>

          {subscription.payment_method && (
            <div className="card-glass">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Payment</span>
                <span className="font-semibold">{subscription.payment_method}</span>
              </div>
            </div>
          )}

          {subscription.notes && (
            <div className="card-glass">
              <div className="flex flex-col gap-2">
                <span className="text-muted-foreground">Notes</span>
                <span className="text-sm">{subscription.notes}</span>
              </div>
            </div>
          )}
        </div>

        {/* Spending History */}
        <div className="card-glass">
          <h3 className="font-semibold mb-3">Spending History (Last 6 Months)</h3>
          <div className="h-32 bg-muted/30 rounded-lg flex items-center justify-center text-muted-foreground">
            Chart Placeholder
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button className="w-full btn-primary h-14">
            <Edit className="w-5 h-5 mr-2" />
            Edit Details
          </Button>

          <Button
            onClick={() => navigate("/cancel-guide")}
            className="w-full btn-secondary h-14"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Cancel Guide
          </Button>

          <Button
            variant="outline"
            className="w-full h-14 text-destructive border-destructive hover:bg-destructive/10"
            onClick={() => {
              if (confirm("Are you sure you want to delete this subscription?")) {
                deleteSubscription.mutate();
              }
            }}
            disabled={deleteSubscription.isPending}
          >
            <Trash2 className="w-5 h-5 mr-2" />
            {deleteSubscription.isPending ? "Deleting..." : "Delete Subscription"}
          </Button>
        </div>

        {/* Snooze Toggle */}
        <div className="card-glass">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="font-medium">Snooze renewal alerts</p>
              <p className="text-sm text-muted-foreground mt-1">
                Turn off reminders for this subscription
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubscriptionDetail;

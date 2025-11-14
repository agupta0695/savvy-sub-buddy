import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { useAlerts, useUpdateAlert } from "@/hooks/useAlerts";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const categoryIcons: Record<string, string> = {
  Entertainment: "🎬",
  Fitness: "💪",
  Software: "🎨",
  Shopping: "🛍️",
  Food: "🍔",
  Other: "📦",
};

const Alerts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [filter, setFilter] = useState("All");
  const { data: alerts = [], isLoading } = useAlerts(filter);
  const updateAlert = useUpdateAlert();

  const getDaysLeft = (nextRenewal: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset to start of day for accurate calculation
    const renewalDate = new Date(nextRenewal);
    renewalDate.setHours(0, 0, 0, 0); // Reset to start of day
    const diffTime = renewalDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUrgencyFromDays = (daysLeft: number) => {
    if (daysLeft <= 2) return "critical";
    if (daysLeft <= 7) return "warning";
    return "info";
  };

  const handleKeepIt = async (alertId: string) => {
    try {
      await updateAlert.mutateAsync({ alertId, action: "kept" });
      toast({
        title: "Alert dismissed",
        description: "We'll remind you again closer to the renewal date.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update alert",
        variant: "destructive",
      });
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "border-l-4 border-l-orange-500 bg-orange-50 dark:bg-orange-950/20";
      case "warning":
        return "border-l-4 border-l-accent bg-accent/5";
      case "info":
        return "border-l-4 border-l-primary bg-primary/5";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 bg-background border-b border-border px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold">{t.renewalAlerts}</h1>
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-input bg-background text-sm"
          >
            <option>All</option>
            <option>Critical</option>
            <option>Warning</option>
          </select>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-6 flex gap-4 border-b border-border">
          <button className="pb-3 px-1 border-b-2 border-primary text-primary font-medium">
            Upcoming
          </button>
          <button className="pb-3 px-1 text-muted-foreground hover:text-foreground">
            Past Alerts
          </button>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        ) : alerts.length === 0 ? (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-4">
              <span className="text-3xl">✅</span>
            </div>
            <p className="text-muted-foreground">
              {t.noUpcomingRenewals}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => {
              const daysLeft = getDaysLeft(alert.subscription.next_renewal);
              const urgency = getUrgencyFromDays(daysLeft);
              const subscription = alert.subscription;

              return (
                <div
                  key={alert.id}
                  className={`card-glass ${getUrgencyColor(urgency)}`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl">
                      {categoryIcons[subscription.category] || categoryIcons.Other}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{subscription.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span
                          className={`text-sm font-medium ${
                            urgency === "critical"
                              ? "text-orange-600"
                              : urgency === "warning"
                              ? "text-accent"
                              : "text-primary"
                          }`}
                        >
                          {daysLeft} {t.daysLeft}
                        </span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-lg font-bold text-foreground">
                          ₹{subscription.amount.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 h-11"
                      onClick={() => handleKeepIt(alert.id)}
                      disabled={updateAlert.isPending}
                    >
                      {t.keepIt}
                    </Button>
                    <Button
                      onClick={() => navigate("/cancel-guide")}
                      className={`flex-1 h-11 ${
                        urgency === "critical"
                          ? "bg-orange-500 hover:bg-orange-600 text-white"
                          : "bg-accent hover:bg-accent/90 text-accent-foreground"
                      }`}
                    >
                      {t.cancelGuide}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Alerts;

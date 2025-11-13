import { Logo } from "@/components/Logo";
import { Bell, Settings, Plus, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import heroUser from "@/assets/hero-user.png";
import { useSubscriptions, useMonthlySpending, useExpiringSubscriptions } from "@/hooks/useSubscriptions";
import { useAlerts } from "@/hooks/useAlerts";

const categoryIcons: Record<string, string> = {
  Entertainment: "🎬",
  Fitness: "💪",
  Software: "🎨",
  Shopping: "🛍️",
  Food: "🍔",
  Other: "📦",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { data: subscriptions = [], isLoading: subsLoading } = useSubscriptions();
  const { data: monthlySpending = 0, isLoading: spendingLoading } = useMonthlySpending();
  const { data: alerts = [], isLoading: alertsLoading } = useAlerts("All");

  const getDaysLeft = (nextRenewal: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset to start of day for accurate calculation
    const renewalDate = new Date(nextRenewal);
    renewalDate.setHours(0, 0, 0, 0); // Reset to start of day
    const diffTime = renewalDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const annualCost = monthlySpending * 12;
  const subscriptionCount = subscriptions.length;
  
  // Filter alerts to only show those with 7 days or less
  const urgentAlerts = alerts.filter(alert => {
    const daysLeft = getDaysLeft(alert.subscription.next_renewal);
    return daysLeft <= 7 && daysLeft >= 0;
  });
  const urgentCount = urgentAlerts.length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/alerts")}
              className="relative p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Bell className="w-6 h-6 text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </button>
            <button
              onClick={() => navigate("/settings")}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Settings className="w-6 h-6 text-foreground" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Hero Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="stat-card bg-gradient-to-br from-primary to-primary/80">
            {spendingLoading ? (
              <Skeleton className="h-12 w-32 bg-white/20" />
            ) : (
              <div className="text-5xl font-bold">₹{monthlySpending.toLocaleString("en-IN")}</div>
            )}
            <div className="text-sm mt-2 opacity-90">Monthly Spending</div>
          </div>
          <div className="stat-card bg-gradient-to-br from-secondary to-secondary/80">
            {spendingLoading ? (
              <Skeleton className="h-12 w-32 bg-white/20" />
            ) : (
              <div className="text-5xl font-bold">₹{annualCost.toLocaleString("en-IN")}</div>
            )}
            <div className="text-sm mt-2 opacity-90">Annual Cost</div>
          </div>
          <div className="stat-card bg-gradient-to-br from-purple-600 to-purple-500">
            {subsLoading ? (
              <Skeleton className="h-12 w-16 bg-white/20" />
            ) : (
              <div className="text-5xl font-bold">{subscriptionCount}</div>
            )}
            <div className="text-sm mt-2 opacity-90">Active Subscriptions</div>
          </div>
        </div>

        {/* Alert Banner */}
        {!alertsLoading && !subsLoading && urgentCount > 0 && subscriptionCount > 0 && (
          <div className="bg-accent/10 border-2 border-accent rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-foreground">
                  ⚠️ {urgentCount} renewal{urgentCount > 1 ? "s" : ""} coming up in the next 7 days
                </p>
                <button
                  onClick={() => navigate("/alerts")}
                  className="text-sm text-primary hover:underline mt-1"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-teal-500 to-emerald-600 p-8 text-white">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl font-bold mb-3">Save More, Stress Less</h2>
            <p className="text-lg opacity-90">
              Join 10,000+ users saving ₹500-800/month on autopilot.
            </p>
          </div>
          <img
            src={heroUser}
            alt="Happy user"
            className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full object-cover border-4 border-white/20"
          />
        </div>

        {/* Subscriptions List */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Your Subscriptions</h3>
          {subsLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          ) : subscriptions.length === 0 ? (
            <div className="card-glass text-center py-12">
              <p className="text-muted-foreground mb-4">No subscriptions yet</p>
              <Button onClick={() => navigate("/add-subscription")}>
                Add Your First Subscription
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {subscriptions.map((sub) => {
                const daysLeft = getDaysLeft(sub.next_renewal);
                const isUrgent = daysLeft <= 7 && daysLeft >= 0;

                return (
                  <div
                    key={sub.id}
                    onClick={() => navigate(`/subscription/${sub.id}`)}
                    className={`card-glass cursor-pointer ${
                      isUrgent ? "border-2 border-accent" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl">
                        {categoryIcons[sub.category] || categoryIcons.Other}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{sub.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md">
                            {sub.category}
                          </span>
                          {isUrgent && (
                            <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-md font-medium">
                              {daysLeft} day{daysLeft !== 1 ? "s" : ""} left
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-foreground">
                          ₹{sub.amount.toLocaleString("en-IN")}
                        </div>
                        <div className="text-xs text-muted-foreground">{formatDate(sub.next_renewal)}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Floating Add Button */}
      <Button
        onClick={() => navigate("/add-subscription")}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full btn-primary p-0 shadow-elevated z-50"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default Dashboard;

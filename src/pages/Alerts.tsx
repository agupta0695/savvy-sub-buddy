import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const alerts = [
  { id: 1, name: "Gym Membership", amount: 2500, icon: "💪", daysLeft: 2, urgency: "critical" },
  { id: 2, name: "Netflix", amount: 649, icon: "🎬", daysLeft: 7, urgency: "warning" },
  { id: 3, name: "Spotify Premium", amount: 119, icon: "🎵", daysLeft: 14, urgency: "info" },
];

const Alerts = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");

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
            <h1 className="text-xl font-semibold">Renewal Alerts</h1>
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

        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`card-glass ${getUrgencyColor(alert.urgency)}`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl">
                  {alert.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{alert.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span
                      className={`text-sm font-medium ${
                        alert.urgency === "critical"
                          ? "text-orange-600"
                          : alert.urgency === "warning"
                          ? "text-accent"
                          : "text-primary"
                      }`}
                    >
                      {alert.daysLeft} days left
                    </span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-lg font-bold text-foreground">₹{alert.amount}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 h-11">
                  Keep It
                </Button>
                <Button
                  onClick={() => navigate("/cancel-guide")}
                  className={`flex-1 h-11 ${
                    alert.urgency === "critical"
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "bg-accent hover:bg-accent/90 text-accent-foreground"
                  }`}
                >
                  Cancel Guide
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-4">
            <span className="text-3xl">✅</span>
          </div>
          <p className="text-muted-foreground">
            All caught up! No more urgent renewals.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Alerts;

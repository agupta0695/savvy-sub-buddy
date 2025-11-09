import { Logo } from "@/components/Logo";
import { Bell, Settings, Plus, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroUser from "@/assets/hero-user.png";

const subscriptions = [
  { id: 1, name: "Netflix", amount: 649, category: "Entertainment", nextRenewal: "Nov 15, 2025", icon: "🎬", daysLeft: 15 },
  { id: 2, name: "Spotify Premium", amount: 119, category: "Entertainment", nextRenewal: "Nov 20, 2025", icon: "🎵", daysLeft: 20 },
  { id: 3, name: "Gym Membership", amount: 2500, category: "Fitness", nextRenewal: "Nov 10, 2025", icon: "💪", daysLeft: 2, urgent: true },
  { id: 4, name: "Adobe Creative Cloud", amount: 1680, category: "Software", nextRenewal: "Nov 25, 2025", icon: "🎨", daysLeft: 25 },
  { id: 5, name: "YouTube Premium", amount: 139, category: "Entertainment", nextRenewal: "Oct 18, 2025", icon: "📺", daysLeft: 18 },
];

const Dashboard = () => {
  const navigate = useNavigate();

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
            <div className="text-5xl font-bold">₹6,800</div>
            <div className="text-sm mt-2 opacity-90">Monthly Spending</div>
          </div>
          <div className="stat-card bg-gradient-to-br from-secondary to-secondary/80">
            <div className="text-5xl font-bold">₹81,600</div>
            <div className="text-sm mt-2 opacity-90">Annual Cost</div>
          </div>
          <div className="stat-card bg-gradient-to-br from-purple-600 to-purple-500">
            <div className="text-5xl font-bold">11</div>
            <div className="text-sm mt-2 opacity-90">Active Subscriptions</div>
          </div>
        </div>

        {/* Alert Banner */}
        <div className="bg-accent/10 border-2 border-accent rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-foreground">
                ⚠️ 2 renewals coming up in the next 7 days
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
          <div className="space-y-3">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                onClick={() => navigate(`/subscription/${sub.id}`)}
                className={`card-glass cursor-pointer ${
                  sub.urgent ? "border-2 border-accent" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl">
                    {sub.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{sub.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md">
                        {sub.category}
                      </span>
                      {sub.urgent && (
                        <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-md font-medium">
                          {sub.daysLeft} days left
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-foreground">₹{sub.amount}</div>
                    <div className="text-xs text-muted-foreground">{sub.nextRenewal}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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

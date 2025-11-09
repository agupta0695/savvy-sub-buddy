import { ArrowLeft, TrendingDown, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Analytics = () => {
  const navigate = useNavigate();

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
            <h1 className="text-xl font-semibold">Spending Insights</h1>
          </div>
          <select className="px-4 py-2 rounded-lg border border-input bg-background text-sm">
            <option>Last 6 Months</option>
            <option>Last Year</option>
          </select>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Monthly Trend */}
        <div className="card-glass">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Monthly Spending Trend</h3>
            <div className="flex items-center gap-2 text-secondary">
              <TrendingDown className="w-4 h-4" />
              <span className="text-sm font-medium">↓ 8.8% vs last month</span>
            </div>
          </div>
          <div className="h-64 bg-muted/30 rounded-xl flex items-center justify-center text-muted-foreground">
            Line Chart: ₹6,800 → ₹6,200 over 6 months
          </div>
          <div className="mt-4 text-center">
            <div className="text-3xl font-bold text-primary">₹6,200</div>
            <div className="text-sm text-muted-foreground mt-1">Current Month</div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="card-glass">
          <h3 className="text-lg font-semibold mb-4">Spending by Category</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-64 bg-muted/30 rounded-xl flex items-center justify-center">
              Donut Chart
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-primary" />
                  <span className="font-medium">Entertainment</span>
                </div>
                <span className="font-bold">40%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-secondary" />
                  <span className="font-medium">Fitness</span>
                </div>
                <span className="font-bold">35%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-purple-600" />
                  <span className="font-medium">Software</span>
                </div>
                <span className="font-bold">20%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-muted" />
                  <span className="font-medium">Other</span>
                </div>
                <span className="font-bold">5%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Money Saved */}
        <div className="card-glass bg-gradient-to-br from-secondary/10 to-secondary/5">
          <div className="text-center">
            <div className="text-5xl mb-3">🎉</div>
            <div className="text-5xl font-bold text-secondary mb-2">₹1,200</div>
            <div className="text-lg font-medium text-foreground mb-1">Saved This Month</div>
            <div className="text-sm text-muted-foreground">
              From 2 canceled subscriptions
            </div>
          </div>
        </div>

        {/* Top Spending */}
        <div className="card-glass">
          <h3 className="text-lg font-semibold mb-4">Top Spending</h3>
          <div className="space-y-4">
            {[
              { name: "Gym", amount: 2500, percentage: 100 },
              { name: "Netflix", amount: 649, percentage: 26 },
              { name: "Grammarly", amount: 850, percentage: 34 },
            ].map((item) => (
              <div key={item.name}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{item.name}</span>
                  <span className="font-bold">₹{item.amount}</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button variant="outline" className="w-full h-12">
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </main>
    </div>
  );
};

export default Analytics;

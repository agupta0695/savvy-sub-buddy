import { ArrowLeft, TrendingDown, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSpendingAnalytics, useCategoryBreakdown } from "@/hooks/useAnalytics";
import { useSubscriptions, useMonthlySpending } from "@/hooks/useSubscriptions";

const categoryColors: Record<string, string> = {
  Entertainment: "bg-primary",
  Fitness: "bg-secondary",
  Software: "bg-purple-600",
  Shopping: "bg-pink-600",
  Food: "bg-orange-600",
  Other: "bg-muted",
};

const Analytics = () => {
  const navigate = useNavigate();
  const { data: analytics = [], isLoading: analyticsLoading } = useSpendingAnalytics();
  const { data: categoryData = [], isLoading: categoryLoading } = useCategoryBreakdown();
  const { data: subscriptions = [] } = useSubscriptions();
  const { data: currentMonthSpending = 0 } = useMonthlySpending();

  const latestAnalytics = analytics[0];
  const previousMonthSpending = analytics[1]?.total_monthly || currentMonthSpending;
  const percentageChange = previousMonthSpending > 0
    ? ((currentMonthSpending - previousMonthSpending) / previousMonthSpending) * 100
    : 0;

  const topSpending = subscriptions
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);
  const maxAmount = topSpending[0]?.amount || 1;

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
            {!analyticsLoading && (
              <div className={`flex items-center gap-2 ${percentageChange < 0 ? 'text-secondary' : 'text-accent'}`}>
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {percentageChange < 0 ? '↓' : '↑'} {Math.abs(percentageChange).toFixed(1)}% vs last month
                </span>
              </div>
            )}
          </div>
          {analyticsLoading ? (
            <Skeleton className="h-64 w-full" />
          ) : (
            <>
              <div className="h-64 bg-muted/30 rounded-xl flex items-center justify-center text-muted-foreground">
                {analytics.length > 0 ? (
                  <div className="text-center">
                    <p className="text-sm mb-2">Last 6 months trend</p>
                    <div className="flex items-end gap-2 justify-center">
                      {analytics.slice(0, 6).reverse().map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <div
                            className="w-8 bg-primary rounded-t"
                            style={{
                              height: `${(item.total_monthly / currentMonthSpending) * 100}px`,
                              minHeight: '20px',
                            }}
                          />
                          <span className="text-xs mt-1">{new Date(item.month).toLocaleDateString('en-US', { month: 'short' })}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p>No analytics data available yet</p>
                )}
              </div>
              <div className="mt-4 text-center">
                <div className="text-3xl font-bold text-primary">₹{currentMonthSpending.toLocaleString("en-IN")}</div>
                <div className="text-sm text-muted-foreground mt-1">Current Month</div>
              </div>
            </>
          )}
        </div>

        {/* Category Breakdown */}
        <div className="card-glass">
          <h3 className="text-lg font-semibold mb-4">Spending by Category</h3>
          {categoryLoading ? (
            <Skeleton className="h-64 w-full" />
          ) : categoryData.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              <p>No category data available</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="h-64 bg-muted/30 rounded-xl flex items-center justify-center">
                <div className="relative w-48 h-48">
                  {categoryData.map((cat, idx) => {
                    const startAngle = categoryData
                      .slice(0, idx)
                      .reduce((sum, c) => sum + (c.percentage * 3.6), 0);
                    return (
                      <div
                        key={cat.category}
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `conic-gradient(from ${startAngle}deg, ${
                            categoryColors[cat.category] || categoryColors.Other
                          } 0deg ${cat.percentage * 3.6}deg, transparent ${cat.percentage * 3.6}deg)`,
                        }}
                      />
                    );
                  })}
                  <div className="absolute inset-8 bg-background rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{categoryData.length}</div>
                      <div className="text-xs text-muted-foreground">Categories</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                {categoryData.map((cat) => (
                  <div key={cat.category} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${categoryColors[cat.category] || categoryColors.Other}`} />
                      <span className="font-medium">{cat.category}</span>
                    </div>
                    <span className="font-bold">{cat.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Money Saved */}
        <div className="card-glass bg-gradient-to-br from-secondary/10 to-secondary/5">
          <div className="text-center">
            <div className="text-5xl mb-3">🎉</div>
            {analyticsLoading ? (
              <Skeleton className="h-16 w-48 mx-auto" />
            ) : (
              <>
                <div className="text-5xl font-bold text-secondary mb-2">
                  ₹{(latestAnalytics?.money_saved || 0).toLocaleString("en-IN")}
                </div>
                <div className="text-lg font-medium text-foreground mb-1">Saved This Month</div>
                <div className="text-sm text-muted-foreground">
                  From canceled subscriptions
                </div>
              </>
            )}
          </div>
        </div>

        {/* Top Spending */}
        <div className="card-glass">
          <h3 className="text-lg font-semibold mb-4">Top Spending</h3>
          {topSpending.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No subscriptions to display</p>
            </div>
          ) : (
            <div className="space-y-4">
              {topSpending.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{item.name}</span>
                    <span className="font-bold">₹{item.amount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(item.amount / maxAmount) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
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

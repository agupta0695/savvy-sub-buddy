import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Premium = () => {
  const navigate = useNavigate();

  const features = [
    { name: "Manual entry", free: true, pro: true },
    { name: "Renewal alerts", free: true, pro: true },
    { name: "SMS Auto-Import", free: false, pro: true },
    { name: "Family Sharing (5)", free: false, pro: true },
    { name: "Advanced Analytics", free: false, pro: true },
    { name: "Priority Support", free: false, pro: true },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 bg-background border-b border-border px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">Upgrade to Pro</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Hero */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-600 to-primary p-12 text-white text-center">
          <Sparkles className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-3">Upgrade to SubSentry Pro</h2>
          <p className="text-xl opacity-90">Save 10x more with advanced features</p>
        </div>

        {/* Features Comparison */}
        <div className="card-glass">
          <h3 className="text-xl font-semibold mb-6">Feature Comparison</h3>
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-4 items-center py-3 border-b last:border-b-0"
              >
                <span className="font-medium">{feature.name}</span>
                <div className="text-center">
                  {feature.free ? (
                    <Check className="w-5 h-5 text-muted-foreground mx-auto" />
                  ) : (
                    <span className="text-muted-foreground text-sm">—</span>
                  )}
                </div>
                <div className="text-center">
                  {feature.pro ? (
                    <Check className="w-5 h-5 text-secondary mx-auto" />
                  ) : (
                    <span className="text-muted-foreground text-sm">—</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card-glass text-center">
            <h3 className="text-2xl font-bold mb-2">₹99/month</h3>
            <p className="text-muted-foreground mb-6">Monthly Plan</p>
            <Button variant="outline" className="w-full h-12">
              Start Free Trial
            </Button>
          </div>

          <div className="card-glass border-2 border-secondary relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-secondary text-secondary-foreground px-4 py-1 text-xs font-bold rounded-bl-xl">
              Best Value
            </div>
            <div className="text-center pt-6">
              <h3 className="text-2xl font-bold mb-2">₹999/year</h3>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-6">
                💰 Save ₹189!
              </div>
              <Button className="w-full btn-secondary h-12">Upgrade Now</Button>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h3 className="text-xl font-semibold mb-6 text-center">What Our Users Say</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card-glass">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600" />
                <div className="flex-1">
                  <p className="font-medium mb-2">
                    "Saved ₹7,800 in my first month! This app is a game-changer."
                  </p>
                  <p className="text-sm text-muted-foreground">— Priya, Pune</p>
                  <div className="flex gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-accent">★</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="card-glass">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-emerald-600" />
                <div className="flex-1">
                  <p className="font-medium mb-2">
                    "SMS auto-import is perfect for someone as busy as me!"
                  </p>
                  <p className="text-sm text-muted-foreground">— Rahul, Bengaluru</p>
                  <div className="flex gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-accent">★</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          🛡️ 30-day money-back guarantee
        </p>
      </main>
    </div>
  );
};

export default Premium;

import { ArrowLeft, Edit, ExternalLink, Trash2, MoreVertical } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const SubscriptionDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-4xl">
            🎬
          </div>
          <h2 className="text-2xl font-bold">Netflix Premium</h2>
        </div>

        {/* Countdown Card */}
        <div className="bg-accent/10 border-2 border-accent rounded-2xl p-6 text-center">
          <div className="text-4xl font-bold text-accent mb-2">7 days</div>
          <p className="text-muted-foreground">until renewal</p>
        </div>

        {/* Info Cards */}
        <div className="space-y-3">
          <div className="card-glass">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Amount</span>
              <span className="text-xl font-bold">₹649/Monthly</span>
            </div>
          </div>

          <div className="card-glass">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Next Renewal</span>
              <span className="font-semibold">Nov 15, 2025</span>
            </div>
          </div>

          <div className="card-glass">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Category</span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-medium">
                Entertainment
              </span>
            </div>
          </div>

          <div className="card-glass">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Payment</span>
              <span className="font-semibold">Credit Card ****1234</span>
            </div>
          </div>
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

          <Button variant="outline" className="w-full h-14 text-destructive border-destructive hover:bg-destructive/10">
            <Trash2 className="w-5 h-5 mr-2" />
            Delete Subscription
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

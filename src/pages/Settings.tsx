import { ArrowLeft, MoreVertical, HelpCircle, ChevronRight, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 bg-background border-b border-border px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold">Settings</h1>
          </div>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <MoreVertical className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8 space-y-8">
        {/* Profile */}
        <div className="card-glass">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-purple-600" />
            <div className="flex-1">
              <h2 className="text-xl font-bold">Priya Sharma</h2>
              <p className="text-sm text-muted-foreground">priya@email.com</p>
              <p className="text-xs text-muted-foreground mt-2">
                11 subscriptions tracked • ₹7,800 saved
              </p>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Notifications</h3>
          
          <div className="card-glass">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-medium">Push Notifications</span>
                <HelpCircle className="w-4 h-4 text-muted-foreground" />
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          <div className="card-glass">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-medium">SMS Alerts (7-day renewals)</span>
                <HelpCircle className="w-4 h-4 text-muted-foreground" />
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          <div className="card-glass">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-medium">WhatsApp Alerts</span>
                <HelpCircle className="w-4 h-4 text-muted-foreground" />
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Preferences</h3>
          
          <button className="w-full card-glass flex items-center justify-between">
            <span className="font-medium">Language</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">English</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </button>
        </div>

        {/* Premium */}
        <div className="card-glass bg-gradient-to-br from-purple-600/10 to-primary/10 border-2 border-purple-600/20">
          <div className="flex items-start gap-3 mb-4">
            <Zap className="w-6 h-6 text-purple-600" />
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Upgrade to Pro</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• SMS Auto-Import</li>
                <li>• Family Sharing</li>
                <li>• Advanced Analytics</li>
              </ul>
            </div>
          </div>
          <Button onClick={() => navigate("/premium")} className="w-full btn-primary">
            Upgrade Now
          </Button>
        </div>

        {/* Data */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Data Management</h3>
          
          <button className="w-full card-glass flex items-center justify-between">
            <span className="font-medium">Export My Data</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button className="w-full card-glass flex items-center justify-between">
            <span className="font-medium">Privacy Policy</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Account */}
        <div className="space-y-4">
          <Button variant="outline" className="w-full h-12 text-destructive border-destructive hover:bg-destructive/10">
            Logout
          </Button>
          
          <button className="w-full text-center text-sm text-muted-foreground hover:text-foreground">
            Delete Account
          </button>
        </div>
      </main>
    </div>
  );
};

export default Settings;

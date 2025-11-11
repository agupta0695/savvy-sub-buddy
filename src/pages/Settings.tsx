import { ArrowLeft, MoreVertical, HelpCircle, ChevronRight, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserSettings, useUpdateUserSettings, useUserProfile } from "@/hooks/useUserSettings";
import { useSubscriptions, useMonthlySpending } from "@/hooks/useSubscriptions";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: settings, isLoading: settingsLoading } = useUserSettings();
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const { data: subscriptions = [] } = useSubscriptions();
  const { data: monthlySpending = 0 } = useMonthlySpending();
  const updateSettings = useUpdateUserSettings();

  const handleSettingChange = async (key: string, value: boolean) => {
    try {
      await updateSettings.mutateAsync({ [key]: value });
      toast({
        title: "Settings updated",
        description: "Your preferences have been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully",
        description: "See you soon!",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

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
          {profileLoading ? (
            <div className="flex items-center gap-4">
              <Skeleton className="w-20 h-20 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                {profile?.name?.charAt(0).toUpperCase() || profile?.email?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{profile?.name || "User"}</h2>
                <p className="text-sm text-muted-foreground">{profile?.email}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {subscriptions.length} subscriptions tracked • ₹{monthlySpending.toLocaleString("en-IN")} monthly
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Notifications</h3>
          
          {settingsLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : (
            <>
              <div className="card-glass">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">Push Notifications</span>
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <Switch
                    checked={settings?.push_notifications ?? true}
                    onCheckedChange={(checked) => handleSettingChange("push_notifications", checked)}
                  />
                </div>
              </div>

              <div className="card-glass">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">SMS Alerts (Premium)</span>
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <Switch
                    checked={settings?.sms_alerts ?? true}
                    onCheckedChange={(checked) => handleSettingChange("sms_alerts", checked)}
                  />
                </div>
              </div>

              <div className="card-glass">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">WhatsApp Alerts (Premium)</span>
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <Switch
                    checked={settings?.whatsapp_alerts ?? false}
                    onCheckedChange={(checked) => handleSettingChange("whatsapp_alerts", checked)}
                  />
                </div>
              </div>

              <div className="card-glass">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">Email Alerts</span>
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <Switch
                    checked={settings?.email_alerts ?? true}
                    onCheckedChange={(checked) => handleSettingChange("email_alerts", checked)}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Preferences */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Preferences</h3>
          
          <button className="w-full card-glass flex items-center justify-between">
            <span className="font-medium">Language</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {profile?.language || "English"}
              </span>
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
          <Button
            variant="outline"
            className="w-full h-12 text-destructive border-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
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

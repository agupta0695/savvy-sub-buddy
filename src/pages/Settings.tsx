import { ArrowLeft, MoreVertical, HelpCircle, ChevronRight, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUserSettings, useUpdateUserSettings, useUserProfile } from "@/hooks/useUserSettings";
import { useSubscriptions, useMonthlySpending } from "@/hooks/useSubscriptions";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language, setLanguage, t } = useLanguage();
  const queryClient = useQueryClient();
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

  const updateLanguage = useMutation({
    mutationFn: async (newLanguage: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("users")
        .update({ language: newLanguage })
        .eq("id", user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });

  const handleLanguageChange = async (value: string) => {
    try {
      setLanguage(value as 'en' | 'hi' | 'te' | 'gu' | 'ta');
      await updateLanguage.mutateAsync(value);
      toast({
        title: "Language updated",
        description: "Your language preference has been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update language",
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

  const getLanguageName = (lang: string) => {
    const names: Record<string, string> = {
      'en': 'English',
      'hi': 'हिंदी (Hindi)',
      'te': 'తెలుగు (Telugu)',
      'gu': 'ગુજરાતી (Gujarati)',
      'ta': 'தமிழ் (Tamil)',
    };
    return names[lang] || 'English';
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
            <h1 className="text-xl font-semibold">{t.settings}</h1>
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
                  {subscriptions.length} {t.subscriptionsTracked} • ₹{monthlySpending.toLocaleString("en-IN")} {t.monthly.toLowerCase()}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t.notifications}</h3>
          
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
                    <span className="font-medium">{t.pushNotifications}</span>
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
                    <span className="font-medium">{t.smsAlerts}</span>
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
                    <span className="font-medium">{t.whatsappAlerts}</span>
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
                    <span className="font-medium">{t.smsAlerts}</span>
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
          <h3 className="text-lg font-semibold">{t.preferences}</h3>
          
          <div className="card-glass">
            <div className="flex items-center justify-between">
              <span className="font-medium">{t.language}</span>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[200px] bg-background border-border">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border z-50">
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                  <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
                  <SelectItem value="gu">ગુજરાતી (Gujarati)</SelectItem>
                  <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Premium */}
        <div className="card-glass bg-gradient-to-br from-purple-600/10 to-primary/10 border-2 border-purple-600/20">
          <div className="flex items-start gap-3 mb-4">
            <Zap className="w-6 h-6 text-purple-600" />
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">{t.upgradeToPro}</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• {t.smsAutoImport}</li>
                <li>• {t.familySharing}</li>
                <li>• {t.advancedAnalytics}</li>
              </ul>
            </div>
          </div>
          <Button onClick={() => navigate("/premium")} className="w-full btn-primary">
            {t.upgradeNow}
          </Button>
        </div>

        {/* Data */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t.data}</h3>
          
          <button className="w-full card-glass flex items-center justify-between">
            <span className="font-medium">{t.exportMyData}</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button className="w-full card-glass flex items-center justify-between">
            <span className="font-medium">{t.privacyPolicy}</span>
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
            {t.logout}
          </Button>
          
          <button className="w-full text-center text-sm text-muted-foreground hover:text-foreground">
            {t.deleteAccount}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Settings;

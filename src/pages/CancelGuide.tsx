import { ArrowLeft, Clock, ExternalLink, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CancelGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 bg-background border-b border-border px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">How to Cancel Netflix</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-3xl">
            🎬
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Takes about 5 minutes</span>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          <div className="card-glass">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-success text-success-foreground flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Log in to your Netflix account</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Visit netflix.com and sign in with your credentials
                </p>
                <div className="h-32 bg-muted/30 rounded-lg flex items-center justify-center text-sm text-muted-foreground">
                  Screenshot: Netflix Login
                </div>
                <div className="mt-3 flex items-center gap-2 text-success">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Completed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card-glass">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Go to Account Settings</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Navigate to Account Settings → Membership & Billing
                </p>
                <div className="h-32 bg-muted/30 rounded-lg flex items-center justify-center text-sm text-muted-foreground">
                  Screenshot: Account Settings
                </div>
              </div>
            </div>
          </div>

          <div className="card-glass">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Click 'Cancel Membership'</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Find the cancellation option and confirm your choice
                </p>
                <div className="h-32 bg-muted/30 rounded-lg flex items-center justify-center text-sm text-muted-foreground">
                  Screenshot: Cancel Button
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Primary CTA */}
        <Button className="w-full btn-primary h-14 text-base">
          Open Netflix Cancellation Page
          <ExternalLink className="w-5 h-5 ml-2" />
        </Button>

        {/* Community Tips */}
        <div className="card-glass bg-muted/50">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💬</span>
            <div>
              <h3 className="font-semibold mb-3">Community Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Call customer service at 1800-XXX if the link doesn't work</li>
                <li>• Take a screenshot of the confirmation for your records</li>
                <li>• You can still use Netflix until your billing period ends</li>
              </ul>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full h-12"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <CheckCircle2 className="w-4 h-4 mr-2" />
          Mark as Canceled in SubSentry
        </Button>
      </main>
    </div>
  );
};

export default CancelGuide;

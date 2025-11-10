import { useState } from "react";
import { ArrowLeft, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const categories = ["Entertainment", "Fitness", "Software", "Shopping", "Food", "Other"];

const AddSubscription = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState("Entertainment");
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    billingCycle: "Monthly",
    renewalDate: "",
  });

  const addSubscription = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("subscriptions").insert({
        user_id: user.id,
        name: formData.name,
        amount: parseFloat(formData.amount),
        category: selectedCategory,
        cycle: formData.billingCycle,
        next_renewal: formData.renewalDate,
        is_active: true,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      queryClient.invalidateQueries({ queryKey: ["monthly-spending"] });
      toast({
        title: "🎉 Awesome!",
        description: "Subscription added! We'll remind you 7 days before renewal.",
      });
      setTimeout(() => navigate("/dashboard"), 1000);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add subscription. Please try again.",
        variant: "destructive",
      });
      console.error("Error adding subscription:", error);
    },
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.amount || !formData.renewalDate) {
      toast({
        title: "Oops!",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    addSubscription.mutate();
  };

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
          <h1 className="text-xl font-semibold">Add Subscription</h1>
          <span className="text-sm text-muted-foreground">Step 1 of 3</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        <div className="space-y-6">
          <div>
            <Label htmlFor="name">Subscription Name</Label>
            <Input
              id="name"
              placeholder="e.g., Netflix, Spotify, Gym"
              className="mt-2 h-14"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="649"
              className="mt-2 h-14"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="cycle">Billing Cycle</Label>
            <select
              id="cycle"
              className="mt-2 w-full h-14 px-4 rounded-xl border border-input bg-background"
              value={formData.billingCycle}
              onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value })}
            >
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Annual</option>
            </select>
          </div>

          <div>
            <Label htmlFor="date">Next Renewal Date</Label>
            <Input
              id="date"
              type="date"
              className="mt-2 h-14"
              value={formData.renewalDate}
              onChange={(e) => setFormData({ ...formData, renewalDate: e.target.value })}
            />
          </div>

          <div>
            <Label>Category</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-950/20 rounded-xl p-4 flex items-center gap-3">
            <Zap className="w-5 h-5 text-purple-600" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                Premium: Auto-import from SMS
              </p>
            </div>
            <button className="text-sm text-primary hover:underline font-medium">
              Upgrade
            </button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            ✨ This takes less than 2 minutes!
          </p>

          <Button
            onClick={handleSubmit}
            className="w-full btn-primary h-14 text-base"
            disabled={addSubscription.isPending}
          >
            {addSubscription.isPending ? "Adding..." : "Add Subscription"}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default AddSubscription;

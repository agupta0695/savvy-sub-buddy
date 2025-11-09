import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import onboarding1 from "@/assets/onboarding-1.png";
import onboarding2 from "@/assets/onboarding-2.png";
import onboarding3 from "@/assets/onboarding-3.png";

const onboardingScreens = [
  {
    image: onboarding1,
    title: "The Hidden Problem",
    subtitle: "Most people waste ₹1,200/month on forgotten subscriptions without realizing it.",
  },
  {
    image: onboarding2,
    title: "We've Got Your Back",
    subtitle: "Get friendly alerts 7 days before every renewal. Never be surprised again.",
  },
  {
    image: onboarding3,
    title: "Save More, Stress Less",
    subtitle: "Join 10,000+ users saving ₹500-800/month on autopilot.",
  },
];

const Onboarding = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentScreen < onboardingScreens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      navigate("/dashboard");
    }
  };

  const handleSkip = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex justify-end p-4">
        <button
          onClick={handleSkip}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        <img
          src={onboardingScreens[currentScreen].image}
          alt={onboardingScreens[currentScreen].title}
          className="w-full max-w-sm h-48 object-contain mb-8"
        />

        <h1 className="text-3xl font-bold text-center mb-4">
          {onboardingScreens[currentScreen].title}
        </h1>

        <p className="text-base text-muted-foreground text-center max-w-md mb-12">
          {onboardingScreens[currentScreen].subtitle}
        </p>

        <div className="flex gap-2 mb-8">
          {onboardingScreens.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentScreen
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        {currentScreen === onboardingScreens.length - 1 ? (
          <Button onClick={handleNext} className="btn-primary w-full max-w-md">
            Let's Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        ) : (
          <Button onClick={handleNext} className="btn-primary w-full max-w-md">
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;

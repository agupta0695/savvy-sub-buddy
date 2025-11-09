import { CheckCircle2 } from "lucide-react";

export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <CheckCircle2 className="w-10 h-10 text-primary" strokeWidth={2.5} />
      <span className="text-2xl font-bold text-primary">SubSentry</span>
    </div>
  );
};

// src/components/ProgressBar.tsx

import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  label?: string;
  variant?: "default" | "success" | "warning" | "primary";
}

const ProgressBar = ({ 
  value, 
  max = 100, 
  className = "", 
  label,
  variant = "default" 
}: ProgressBarProps) => {
  // Ensure percentage is between 0 and 100
  const percentage = Math.max(0, Math.min(Math.round((value / max) * 100), 100));
  
  const variants = {
    default: "bg-primary",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    primary: "bg-primary", // Orange for the "Why This Fits" bars
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Label and Percentage on the same line */}
      <div className="flex items-center justify-between text-sm mb-1">
        {label && <span className="text-muted-foreground">{label}</span>}
        <span className="font-semibold text-foreground">{percentage}%</span>
      </div>
      {/* The progress bar itself */}
      <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            variants[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
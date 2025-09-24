import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  label?: string;
  variant?: "default" | "success" | "warning" | "primary";
}

const ProgressBar = ({ 
  value, 
  max = 100, 
  className = "", 
  showLabel = true, 
  label,
  variant = "default" 
}: ProgressBarProps) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const variants = {
    default: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    primary: "bg-primary",
  };

  return (
    <div className={cn("space-y-2", className)}>
      {showLabel && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{label || "Progress"}</span>
          <span className="font-medium">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
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
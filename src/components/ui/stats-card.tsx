import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: ReactNode;
  trend?: {
    value: number;
    positive?: boolean;
    isPositive?: boolean;
  };
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "info" | "danger";
  className?: string;
}

const variantStyles = {
  default: "bg-card",
  primary: "bg-gradient-primary text-primary-foreground",
  secondary: "bg-gradient-secondary text-secondary-foreground",
  success: "bg-gradient-success text-success-foreground",
  warning: "bg-warning/10 border-warning/20",
  info: "bg-info/10 border-info/20",
  danger: "bg-danger/10 border-danger/20",
};

const iconContainerStyles = {
  default: "bg-primary/10 text-primary",
  primary: "bg-primary-foreground/20 text-primary-foreground",
  secondary: "bg-secondary-foreground/20 text-secondary-foreground",
  success: "bg-success-foreground/20 text-success-foreground",
  warning: "bg-warning/20 text-warning",
  info: "bg-info/20 text-info",
  danger: "bg-danger/20 text-danger",
};

export const StatsCard = ({
  title,
  value,
  description,
  icon,
  trend,
  variant = "default",
  className,
}: StatsCardProps) => {
  const isPositive = trend?.positive ?? trend?.isPositive ?? false;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        variant={variant === "default" ? "elevated" : "flat"}
        className={cn(variantStyles[variant], "p-6", className)}
      >
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className={cn(
              "text-sm font-medium",
              variant === "default" ? "text-muted-foreground" : "opacity-80"
            )}>
              {title}
            </p>
            <p className="text-3xl font-display font-bold">{value}</p>
            {description && (
              <p className={cn(
                "text-xs",
                variant === "default" ? "text-muted-foreground" : "opacity-70"
              )}>
                {description}
              </p>
            )}
            {trend && (
              <div className={cn(
                "flex items-center gap-1 text-xs font-medium",
                isPositive ? "text-success" : "text-danger"
              )}>
                <span>{isPositive ? "↑" : "↓"}</span>
                <span>{Math.abs(trend.value)}%</span>
                <span className="opacity-60">vs mois dernier</span>
              </div>
            )}
          </div>
          <div className={cn(
            "p-3 rounded-xl",
            iconContainerStyles[variant]
          )}>
            {icon}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

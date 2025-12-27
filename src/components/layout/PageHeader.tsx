import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export const PageHeader = ({ title, description, children, className }: PageHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-8", className)}
    >
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-3 mt-4 md:mt-0">{children}</div>}
    </motion.div>
  );
};

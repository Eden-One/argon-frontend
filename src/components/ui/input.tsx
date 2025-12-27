import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-lg border bg-background text-foreground transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary",
        filled: "border-transparent bg-muted focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-ring",
        ghost: "border-transparent bg-transparent hover:bg-muted focus-visible:bg-muted",
      },
      inputSize: {
        default: "h-10 px-4 py-2 text-sm",
        sm: "h-8 px-3 py-1 text-xs rounded-md",
        lg: "h-12 px-5 py-3 text-base rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, inputSize, icon, iconPosition = "left", ...props }, ref) => {
    if (icon) {
      return (
        <div className="relative">
          {iconPosition === "left" && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ variant, inputSize, className }),
              iconPosition === "left" && "pl-10",
              iconPosition === "right" && "pr-10"
            )}
            ref={ref}
            {...props}
          />
          {iconPosition === "right" && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {icon}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, inputSize, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };

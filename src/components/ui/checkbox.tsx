import * as React from "react";
import { cn } from "@/lib/utils";

export const Checkbox = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="checkbox"
        className={cn(
          "h-4 w-4 shrink-0 rounded border border-slate-300 accent-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400",
          className
        )}
        {...props}
      />
    );
  }
);
Checkbox.displayName = "Checkbox";

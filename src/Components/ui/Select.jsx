import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

const Select = React.forwardRef(({ 
  className, 
  children, 
  variant = "default",
  ...props 
}, ref) => {
  const variantClasses = {
    default: "border-slate-200 text-slate-900",
    teal: "border-teal-200 text-slate-900",
  };

  return (
    <div className="relative">
      <select
        className={cn(
          "w-full h-14 pl-4 pr-10 rounded-xl border bg-white appearance-none",
          "focus:border-teal-500 focus:outline-none transition-colors",
          "text-base font-normal",
          variantClasses[variant],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
      <ChevronDown 
        className={cn(
          "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5",
          variant === "teal" ? "text-teal-600" : "text-slate-400"
        )}
      />
    </div>
  );
});

Select.displayName = "Select";

export { Select };

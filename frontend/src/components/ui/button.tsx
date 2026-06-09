import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
};

const variantClasses = {
  default:
    "bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700",
  outline:
    "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50",
  ghost: "text-slate-700 hover:bg-slate-100",
};

const sizeClasses = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-lg px-3",
  lg: "h-12 rounded-xl px-6",
  icon: "h-10 w-10",
};

function Button({
  className,
  variant = "default",
  size = "default",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      data-slot="button"
      type={type}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}

export { Button };

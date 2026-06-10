import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeProps = React.ComponentProps<"span"> & {
  variant?: "default" | "secondary" | "outline" | "success";
};

const variants = {
  default: "border-transparent bg-blue-600 text-white",
  secondary: "border-transparent bg-slate-100 text-slate-700",
  outline: "border-slate-200 bg-white text-slate-600",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn("inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-xs font-semibold", variants[variant], className)}
      {...props}
    />
  );
}

export { Badge };

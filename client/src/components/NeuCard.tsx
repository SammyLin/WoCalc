import { cn } from "@/lib/utils";
import React from "react";

interface NeuCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "flat" | "pressed";
}

export function NeuCard({ children, className, variant = "flat", ...props }: NeuCardProps) {
  return (
    <div
      className={cn(
        variant === "flat" ? "neu-flat" : "neu-pressed",
        "p-6 transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

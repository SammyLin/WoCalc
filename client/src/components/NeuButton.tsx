import { cn } from "@/lib/utils";
import React from "react";

interface NeuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isActive?: boolean;
}

export function NeuButton({ children, className, isActive, ...props }: NeuButtonProps) {
  return (
    <button
      className={cn(
        "neu-btn px-6 py-3 flex items-center justify-center gap-2",
        isActive && "neu-pressed text-primary shadow-none translate-y-[1px]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

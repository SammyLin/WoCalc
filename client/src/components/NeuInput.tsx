import { cn } from "@/lib/utils";
import React from "react";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NeuInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  unit?: string;
  tooltip?: string;
}

export const NeuInput = React.forwardRef<HTMLInputElement, NeuInputProps>(
  ({ className, label, unit, tooltip, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <div className="flex items-center gap-2 ml-1">
            <label className="text-text-main font-semibold text-sm">
              {label}
            </label>
            {tooltip && (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Info className="w-4 h-4 text-text-light cursor-help hover:text-primary transition-colors" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs bg-neu-base text-text-main border-none shadow-[4px_4px_8px_#A3B1C6,-4px_-4px_8px_#FFFFFF] p-3 rounded-lg text-xs leading-relaxed z-50">
                            <p>{tooltip}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
          </div>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={cn(
              "neu-input font-nunito text-lg",
              unit && "pr-10",
              className
            )}
            {...props}
          />
          {unit && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light font-bold">
              {unit}
            </span>
          )}
        </div>
      </div>
    );
  }
);

NeuInput.displayName = "NeuInput";

// src/components/common/LoadingSpinner.tsx
import React from 'react';
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils"; // Import the cn utility

interface LoadingSpinnerProps {
  size?: number; // Optional size prop
  className?: string; // Optional className prop
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 8, className }) => {
  const sizeClasses = {
    4: "h-4 w-4",
    6: "h-6 w-6",
    8: "h-8 w-8",
    10: "h-10 w-10",
    12: "h-12 w-12",
  };
  const sizeClass = sizeClasses[size as keyof typeof sizeClasses] || sizeClasses[8]; // Default to size 8

  return (
    <div className={cn("flex justify-center items-center py-10", className)}> {/* Allow overriding className */}
      <Loader2 className={cn(sizeClass, "animate-spin text-primary")} />
      <span className="sr-only">Loading...</span> {/* For accessibility */}
    </div>
  );
};

export default LoadingSpinner;
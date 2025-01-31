import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface WizardStepsProps {
  currentStep: number;
  steps: string[];
}

export const WizardSteps = ({ currentStep, steps }: WizardStepsProps) => {
  return (
    <div className="w-full py-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between relative">
          {/* Progress bar background */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200" />
          
          {/* Active progress bar */}
          <div 
            className="absolute top-4 left-0 h-0.5 bg-primary transition-all duration-500 ease-in-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
          
          {steps.map((step, index) => (
            <div key={step} className="flex flex-col items-center relative z-10">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 shadow-lg",
                  index < currentStep
                    ? "bg-primary text-white border-primary scale-110"
                    : index === currentStep
                    ? "border-primary text-primary animate-pulse"
                    : "border-gray-300 text-gray-300 bg-white"
                )}
              >
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-sm font-medium transition-all duration-300",
                  index <= currentStep ? "text-primary" : "text-gray-300"
                )}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface WizardStepsProps {
  currentStep: number;
  steps: string[];
}

export const WizardSteps = ({ currentStep, steps }: WizardStepsProps) => {
  return (
    <div className="w-full py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2",
                  index < currentStep
                    ? "bg-primary text-white border-primary"
                    : index === currentStep
                    ? "border-primary text-primary"
                    : "border-gray-300 text-gray-300"
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
                  "ml-2 hidden md:inline",
                  index <= currentStep ? "text-primary" : "text-gray-300"
                )}
              >
                {step}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "hidden md:block w-12 h-0.5 mx-2",
                    index < currentStep ? "bg-primary" : "bg-gray-300"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
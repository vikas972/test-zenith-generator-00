import { useState } from "react";
import { Header } from "@/components/Header";
import { WizardSteps } from "@/components/WizardSteps";
import { SourceSelection } from "@/components/steps/SourceSelection";
import { ScenarioGeneration } from "@/components/steps/ScenarioGeneration";
import { TestCases } from "@/components/steps/TestCases";
import { TestData } from "@/components/steps/TestData";
import { Metrics } from "@/components/steps/Metrics";
import { Button } from "@/components/ui/button";

const STEPS = [
  "Source Selection",
  "Scenario Generation",
  "Test Cases",
  "Test Data",
  "Metrics & Export",
];

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <SourceSelection />;
      case 1:
        return <ScenarioGeneration />;
      case 2:
        return <TestCases />;
      case 3:
        return <TestData />;
      case 4:
        return <Metrics />;
      default:
        return <div>Step {currentStep + 1}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <WizardSteps currentStep={currentStep} steps={STEPS} />
      <main className="pb-12">
        {renderStep()}
        <div className="container mx-auto px-4 mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentStep((prev) => Math.min(STEPS.length - 1, prev + 1))}
            disabled={currentStep === STEPS.length - 1}
          >
            Next
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Index;
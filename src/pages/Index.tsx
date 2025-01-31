import { useState } from "react";
import { Header } from "@/components/Header";
import { WizardSteps } from "@/components/WizardSteps";
import { SourceSelection } from "@/components/steps/SourceSelection";
import { ScenarioGeneration } from "@/components/steps/ScenarioGeneration";

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
          <button
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            className="px-4 py-2 text-secondary hover:text-secondary-hover disabled:opacity-50"
            disabled={currentStep === 0}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentStep((prev) => Math.min(STEPS.length - 1, prev + 1))}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover disabled:opacity-50"
            disabled={currentStep === STEPS.length - 1}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default Index;
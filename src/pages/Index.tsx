
import { useState } from "react";
import { Header } from "@/components/Header";
import { WizardSteps } from "@/components/WizardSteps";
import { SourceSelection } from "@/components/steps/SourceSelection";
import { RequirementsCaptured } from "@/components/steps/RequirementsCaptured";
import { ScenarioGeneration } from "@/components/steps/ScenarioGeneration";
import { TestCases } from "@/components/steps/TestCases";
import { TestData } from "@/components/steps/TestData";
import { Metrics } from "@/components/steps/Metrics";
import { Button } from "@/components/ui/button";

const STEPS = [
  "Source Selection",
  "Requirements Captured",
  "Scenario Generation",
  "Test Cases",
  "Test Data",
  "Metrics & Export",
];

interface SelectedFile {
  id: string;
  name: string;
  uploadTime: Date;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <SourceSelection onFileSelect={setSelectedFile} />;
      case 1:
        return <RequirementsCaptured selectedFile={selectedFile} />;
      case 2:
        return <ScenarioGeneration selectedFile={selectedFile} />;
      case 3:
        return <TestCases selectedFile={selectedFile} />;
      case 4:
        return <TestData selectedFile={selectedFile} />;
      case 5:
        return <Metrics selectedFile={selectedFile} />;
      default:
        return <div>Step {currentStep + 1}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <WizardSteps currentStep={currentStep} steps={STEPS} />
      <main className="flex-1 flex flex-col">
        {renderStep()}
        <div className="border-t mt-auto">
          <div className="container mx-auto px-4 py-4 flex justify-end gap-4">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              >
                Previous
              </Button>
            )}
            <Button
              onClick={() => setCurrentStep((prev) => Math.min(STEPS.length - 1, prev + 1))}
              disabled={currentStep === STEPS.length - 1}
            >
              Next
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

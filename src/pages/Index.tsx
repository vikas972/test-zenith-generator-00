import { useState } from "react";
import { Header } from "@/components/Header";
import { WizardSteps } from "@/components/WizardSteps";
import { SourceSelection } from "@/components/steps/SourceSelection";
import { ScenarioGeneration } from "@/components/steps/ScenarioGeneration";
import { TestCases } from "@/components/steps/TestCases";
import { TestData } from "@/components/steps/TestData";
import { Metrics } from "@/components/steps/Metrics";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const STEPS = [
  "Source Selection",
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
        return <ScenarioGeneration selectedFile={selectedFile} />;
      case 2:
        return <TestCases selectedFile={selectedFile} />;
      case 3:
        return <TestData selectedFile={selectedFile} />;
      case 4:
        return <Metrics selectedFile={selectedFile} />;
      default:
        return <div>Step {currentStep + 1}</div>;
    }
  };

  const renderFileInfo = () => {
    if (currentStep === 0 || !selectedFile) return null;

    return (
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3 text-gray-600">
            <FileText className="h-5 w-5 text-primary" />
            <div>
              <span className="font-medium text-gray-900">{selectedFile.name}</span>
              <span className="mx-2">•</span>
              <span className="text-sm">
                Uploaded on {selectedFile.uploadTime.toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {renderFileInfo()}
      <WizardSteps currentStep={currentStep} steps={STEPS} />
      <main className="pb-12">
        {renderStep()}
        <div className="container mx-auto px-4 mt-8 flex justify-end">
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              className="mr-4"
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
      </main>
    </div>
  );
};

export default Index;
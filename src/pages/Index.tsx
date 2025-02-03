import { useState } from "react";
import { Header } from "@/components/Header";
import { WizardSteps } from "@/components/WizardSteps";
import { SourceSelection } from "@/components/steps/SourceSelection";
import { ScenarioGeneration } from "@/components/steps/ScenarioGeneration";
import { TestCases } from "@/components/steps/TestCases";
import { TestData } from "@/components/steps/TestData";
import { Metrics } from "@/components/steps/Metrics";
import { Button } from "@/components/ui/button";
import { FileText, Database, Cloud, Globe } from "lucide-react";

const STEPS = [
  "Source Selection",
  "Scenario Generation",
  "Test Cases",
  "Test Data",
  "Metrics & Export",
];

interface SelectedFileInfo {
  id: string;
  name: string;
  source: string;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFileInfo, setSelectedFileInfo] = useState<SelectedFileInfo | null>(null);

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "jira":
        return <Globe className="h-4 w-4" />;
      case "confluence":
        return <Cloud className="h-4 w-4" />;
      case "database":
        return <Database className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const handleNext = () => {
    if (currentStep === 0 && !selectedFileInfo) return;
    setCurrentStep((prev) => Math.min(STEPS.length - 1, prev + 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <SourceSelection onFileSelect={setSelectedFileInfo} selectedFileInfo={selectedFileInfo} />;
      case 1:
        return <ScenarioGeneration selectedFile={selectedFileInfo} />;
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
      
      {selectedFileInfo && currentStep > 0 && (
        <div className="bg-white border-b border-gray-200 py-2">
          <div className="container mx-auto px-4 flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium">Selected Source:</span>
            <div className="flex items-center gap-1.5">
              {getSourceIcon(selectedFileInfo.source)}
              <span>{selectedFileInfo.source}</span>
            </div>
            <span className="text-gray-400">|</span>
            <span className="font-medium">File:</span>
            <span className="text-primary">{selectedFileInfo.name}</span>
          </div>
        </div>
      )}

      <main className="pb-12">
        {renderStep()}
        <div className="container mx-auto px-4 mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentStep === STEPS.length - 1 || (currentStep === 0 && !selectedFileInfo)}
          >
            Next
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Index;
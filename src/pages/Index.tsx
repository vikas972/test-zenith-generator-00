
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
import { RequirementBundle, RequirementFile, GlobalParameters } from "@/components/steps/source-selection/types";

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

export const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
  
  // Source selection state that needs to persist
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [selectedBundleId, setSelectedBundleId] = useState<string | null>(null);
  const [bundles, setBundles] = useState<RequirementBundle[]>([]);
  const [globalParameters, setGlobalParameters] = useState<GlobalParameters>({
    product: "DTB",
    subProduct: "CBX",
    domain: "PAYMENTS",
    requirementType: "",
    region: "",
    country: "",
    customer: ""
  });

  const handleBundleAdd = (bundle: RequirementBundle) => {
    // Check if a bundle with this ID already exists
    const exists = bundles.some(b => b.id === bundle.id);
    if (exists) {
      console.log(`Bundle with ID ${bundle.id} already exists, not adding again`);
      return;
    }
    
    setBundles(prev => [...prev, bundle]);
  };

  const handleBundleUpdate = (bundleId: string, files: RequirementFile[]) => {
    setBundles(prev => 
      prev.map(bundle => {
        if (bundle.id === bundleId) {
          // Update bundle status based on file count and statuses
          let status: RequirementBundle["status"] = "incomplete";
          
          if (files.length >= bundle.totalFiles) {
            // If all files are complete, the bundle is complete
            if (files.every(f => f.status === "completed")) {
              status = "completed";
            }
            // If any file is importing, the bundle is importing
            else if (files.some(f => f.status === "importing")) {
              status = "importing";
            }
            // If any file is imported, check if all are imported
            else if (files.some(f => f.status === "imported")) {
              status = files.every(f => f.status === "imported") ? "imported" : "incomplete";
            }
            // If any file failed, the bundle failed
            else if (files.some(f => f.status === "failed")) {
              status = "failed";
            }
            // If some files are still parsing, the bundle is parsing
            else if (files.some(f => f.status === "parsing")) {
              status = "parsing";
            }
          }
          
          return { ...bundle, files, status };
        }
        return bundle;
      })
    );
  };

  const handleBundleDelete = (bundleId: string) => {
    setBundles(prev => prev.filter(b => b.id !== bundleId));
    if (selectedBundleId === bundleId) {
      setSelectedBundleId(null);
    }
  };

  const handleBundleRetry = (bundleId: string) => {
    setBundles(prev => 
      prev.map(bundle => {
        if (bundle.id === bundleId) {
          return { 
            ...bundle, 
            status: "parsing" as RequirementBundle["status"],
            files: bundle.files.map(f => 
              f.status === "failed" ? { ...f, status: "parsing" as RequirementFile["status"] } : f
            )
          };
        }
        return bundle;
      })
    );
    
    // Simulate parsing completion
    setTimeout(() => {
      setBundles(prev => 
        prev.map(bundle => {
          if (bundle.id === bundleId) {
            return { 
              ...bundle, 
              status: "completed" as RequirementBundle["status"],
              files: bundle.files.map(f => ({ ...f, status: "completed" as RequirementFile["status"] }))
            };
          }
          return bundle;
        })
      );
    }, 2000);
  };

  const handleBundleImport = (bundleId: string) => {
    const bundle = bundles.find(b => b.id === bundleId);
    if (!bundle) {
      return;
    }

    if (bundle.status !== "completed") {
      return;
    }

    // Set the bundle status to importing
    setBundles(prev => 
      prev.map(b => {
        if (b.id === bundleId) {
          const updatedFiles = b.files.map(f => {
            // Explicitly cast the status to ensure type safety
            return { ...f, status: "importing" as RequirementFile["status"] };
          });
          
          return { 
            ...b, 
            status: "importing" as RequirementBundle["status"],
            files: updatedFiles
          };
        }
        return b;
      })
    );

    // Simulate the import process for each file with sequential delays
    bundle.files.forEach((file, index) => {
      setTimeout(() => {
        setBundles(prev => 
          prev.map(b => {
            if (b.id === bundleId) {
              const updatedFiles = b.files.map((f) => {
                if (f.id === file.id) {
                  // Explicitly type the status
                  return { ...f, status: "imported" as RequirementFile["status"] };
                }
                return f;
              });
              
              // If all files are imported, update the bundle status
              const allImported = updatedFiles.every(f => f.status === "imported");
              // Explicitly type the status
              const newStatus: RequirementBundle["status"] = allImported ? "imported" : "importing";
              
              return { ...b, files: updatedFiles, status: newStatus };
            }
            return b;
          })
        );
      }, 1000 + (index * 1000)); // Stagger imports by 1 second per file
    });
  };

  const handleSelectBundle = (bundleId: string | null) => {
    setSelectedBundleId(bundleId);
    
    if (bundleId) {
      const bundle = bundles.find(b => b.id === bundleId);
      if (bundle && (bundle.status === "imported" || bundle.status === "completed")) {
        // Convert the bundle to the format expected by the onFileSelect prop
        const mainFile = bundle.files.find(f => f.category === "main");
        if (mainFile) {
          setSelectedFile({
            id: mainFile.id,
            name: mainFile.name,
            uploadTime: mainFile.uploadTime
          });
        }
      } else {
        setSelectedFile(null);
      }
    } else {
      setSelectedFile(null);
    }
  };

  const handleGlobalParametersChange = (params: GlobalParameters) => {
    setGlobalParameters(params);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <SourceSelection 
            onFileSelect={setSelectedFile}
            // Pass the persisted state
            selectedSource={selectedSource}
            setSelectedSource={setSelectedSource}
            selectedBundleId={selectedBundleId}
            bundles={bundles}
            globalParameters={globalParameters}
            handleBundleAdd={handleBundleAdd}
            handleBundleUpdate={handleBundleUpdate}
            handleBundleDelete={handleBundleDelete}
            handleBundleRetry={handleBundleRetry}
            handleBundleImport={handleBundleImport}
            handleSelectBundle={handleSelectBundle}
            handleGlobalParametersChange={handleGlobalParametersChange}
          />
        );
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

  // The Next button should only be enabled when a bundle is imported and selected
  const canProceedFromSourceSelection = currentStep !== 0 || selectedFile !== null;

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
              disabled={currentStep === STEPS.length - 1 || !canProceedFromSourceSelection}
            >
              Next
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

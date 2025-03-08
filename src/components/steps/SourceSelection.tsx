
import { Toaster } from "sonner";
import { SourceSelectionProps } from "./source-selection/types";
import { SourceSelectionHeader } from "./source-selection/components/SourceSelectionHeader";
import { SourceSelectionContent } from "./source-selection/components/SourceSelectionContent";

export const SourceSelection = ({ 
  onFileSelect,
  // Accept persisted state from parent component
  selectedSource,
  setSelectedSource,
  selectedBundleId,
  bundles,
  globalParameters,
  handleBundleAdd,
  handleBundleUpdate,
  handleBundleDelete,
  handleBundleRetry,
  handleBundleImport,
  handleSelectBundle,
  handleGlobalParametersChange
}: SourceSelectionProps) => {
  return (
    <div className="w-full mx-auto px-4 py-8">
      <div className="w-full mx-auto">
        <Toaster position="top-right" />
        <SourceSelectionHeader />
        <SourceSelectionContent 
          selectedSource={selectedSource}
          setSelectedSource={setSelectedSource}
          selectedBundleId={selectedBundleId}
          bundles={bundles}
          globalParameters={globalParameters}
          handleSourceFileSelect={(file) => {
            // When a file is selected, we'll create a new bundle
            if (!selectedSource) return;
            
            // Create a new bundle
            const newBundle = {
              id: `bundle-${Date.now()}`,
              name: `Bundle from ${file.name}`,
              createdAt: new Date(),
              source: selectedSource,
              files: [],
              totalFiles: 1,
              status: "incomplete" as const
            };

            handleBundleAdd(newBundle);
            
            // Simulate adding the file to the bundle
            setTimeout(() => {
              const newFile = {
                id: `file-${Date.now()}`,
                name: file.name.replace(/\.[^/.]+$/, ""),
                uploadTime: new Date(),
                category: "main" as const,
                breakRequirementsBy: "section" as const,
                context: "",
                status: "parsing" as const,
                file
              };
              
              handleBundleUpdate(newBundle.id, [newFile]);

              // Simulate parsing completion
              setTimeout(() => {
                handleBundleUpdate(
                  newBundle.id,
                  [{ ...newFile, status: "completed" as const }]
                );
              }, 2000);
            }, 500);
          }}
          handleBundleAdd={handleBundleAdd}
          handleBundleUpdate={handleBundleUpdate}
          handleBundleDelete={handleBundleDelete}
          handleBundleRetry={handleBundleRetry}
          handleBundleImport={handleBundleImport}
          handleSelectBundle={handleSelectBundle}
          handleGlobalParametersChange={handleGlobalParametersChange}
        />
      </div>
    </div>
  );
};

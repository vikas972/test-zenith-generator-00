
import { GlobalParametersSection } from "../GlobalParametersSection";
import { ImportSourcesGrid } from "../ImportSourcesGrid";
import { RequirementBundleSection } from "../RequirementBundleSection";
import { ImportStatusPanel } from "./import-status/ImportStatusPanel";
import { 
  RequirementBundle, 
  RequirementFile,
  GlobalParameters 
} from "../types";

interface SourceSelectionContentProps {
  selectedSource: string | null;
  setSelectedSource: (source: string) => void;
  selectedBundleId: string | null;
  bundles: RequirementBundle[];
  globalParameters: GlobalParameters;
  handleSourceFileSelect: (file: File) => void;
  handleBundleAdd: (bundle: RequirementBundle) => void;
  handleBundleUpdate: (bundleId: string, files: RequirementFile[]) => void;
  handleBundleDelete: (bundleId: string) => void;
  handleBundleRetry: (bundleId: string) => void;
  handleBundleImport: (bundleId: string) => void;
  handleSelectBundle: (bundleId: string | null) => void;
  handleGlobalParametersChange: (params: GlobalParameters) => void;
}

export const SourceSelectionContent = ({
  selectedSource,
  setSelectedSource,
  selectedBundleId,
  bundles,
  globalParameters,
  handleSourceFileSelect,
  handleBundleAdd,
  handleBundleUpdate,
  handleBundleDelete,
  handleBundleRetry,
  handleBundleImport,
  handleSelectBundle,
  handleGlobalParametersChange
}: SourceSelectionContentProps) => {
  return (
    <>
      <GlobalParametersSection 
        parameters={globalParameters}
        onParametersChange={handleGlobalParametersChange}
      />

      <ImportSourcesGrid
        selectedSource={selectedSource}
        onSourceSelect={setSelectedSource}
      />

      <RequirementBundleSection
        bundles={bundles}
        onBundleAdd={handleBundleAdd}
        onBundleUpdate={handleBundleUpdate}
        onBundleDelete={handleBundleDelete}
        onBundleRetry={handleBundleRetry}
        onBundleImport={handleBundleImport}
        onSelectBundle={handleSelectBundle}
        selectedBundleId={selectedBundleId}
        selectedSource={selectedSource}
      />
      
      <ImportStatusPanel 
        importedBundles={bundles} 
        onSelectBundle={handleSelectBundle}
        selectedBundleId={selectedBundleId}
      />
    </>
  );
};

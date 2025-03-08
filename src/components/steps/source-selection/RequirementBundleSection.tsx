
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { RequirementBundle, RequirementFile } from "./types";
import { BundleHeader } from "./bundle-section/BundleHeader";
import { BundleList } from "./bundle-section/BundleList";
import { DialogManager } from "./bundle-section/DialogManager";
import { useBundleManager } from "./bundle-section/useBundleManager";

interface RequirementBundleSectionProps {
  bundles: RequirementBundle[];
  onBundleAdd: (bundle: RequirementBundle) => void;
  onBundleUpdate: (bundleId: string, files: RequirementFile[]) => void;
  onBundleDelete: (bundleId: string) => void;
  onBundleRetry: (bundleId: string) => void;
  onSelectBundle: (bundleId: string | null) => void;
  onBundleImport: (bundleId: string) => void;
  selectedBundleId: string | null;
  selectedSource: string | null;
}

export const RequirementBundleSection = ({
  bundles,
  onBundleAdd,
  onBundleUpdate,
  onBundleDelete,
  onBundleRetry,
  onSelectBundle,
  onBundleImport,
  selectedBundleId,
  selectedSource
}: RequirementBundleSectionProps) => {
  const {
    isNewBundleDialogOpen,
    setIsNewBundleDialogOpen,
    isAddFileDialogOpen,
    setIsAddFileDialogOpen,
    expandedBundleId,
    setExpandedBundleId,
    bundleHasMainFile,
    toggleExpandBundle,
    handleCreateNewBundle,
    handleAddFileToBundle,
    handleAddFile
  } = useBundleManager({
    bundles,
    onBundleAdd,
    onBundleUpdate,
    selectedBundleId,
    selectedSource
  });

  const handleDeleteFile = (bundleId: string, fileId: string) => {
    const bundle = bundles.find(b => b.id === bundleId);
    if (!bundle) return;
    
    const updatedFiles = bundle.files.filter(f => f.id !== fileId);
    onBundleUpdate(bundleId, updatedFiles);
    toast.success("File removed from bundle");
  };

  const handleCreateBundleClick = () => {
    if (!selectedSource) {
      toast.error("Please select a source type first");
      return;
    }
    setIsNewBundleDialogOpen(true);
  };

  // Handle the import action to collapse the bundle after importing
  const handleImportBundle = (bundleId: string) => {
    // Collapse the bundle that's being imported
    setExpandedBundleId(null);
    // Call the original import handler
    onBundleImport(bundleId);
  };

  // Enhanced version of handleAddFile to handle additional parameters
  const handleAddFileWithParams = (
    file: File, 
    name: string, 
    category: "main" | "supporting", 
    breakBy: "userJourney" | "userStories" | "section" | "paragraph" | "page",
    context: string,
    requirementType: string,
    region?: string,
    country?: string,
    customer?: string
  ) => {
    // Construct context with additional parameters if provided
    let enhancedContext = context || "";
    
    if (region) {
      enhancedContext += `\nRegion: ${region}`;
    }
    if (country) {
      enhancedContext += `\nCountry: ${country}`;
    }
    if (customer) {
      enhancedContext += `\nCustomer: ${customer}`;
    }
    
    handleAddFile(file, name, category, breakBy, enhancedContext, requirementType);
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-sm border-gray-200">
        <BundleHeader onCreateBundle={handleCreateBundleClick} />
        <CardContent>
          <BundleList 
            bundles={bundles}
            expandedBundleId={expandedBundleId}
            selectedBundleId={selectedBundleId}
            onToggleExpand={toggleExpandBundle}
            onDeleteBundle={onBundleDelete}
            onRetryBundle={onBundleRetry}
            onAddFile={handleAddFileToBundle}
            onDeleteFile={handleDeleteFile}
            onSelectBundle={onSelectBundle}
            onImportBundle={handleImportBundle}
            onCreateBundle={handleCreateBundleClick}
          />
        </CardContent>
      </Card>

      <DialogManager 
        isNewBundleDialogOpen={isNewBundleDialogOpen}
        setIsNewBundleDialogOpen={setIsNewBundleDialogOpen}
        isAddFileDialogOpen={isAddFileDialogOpen}
        setIsAddFileDialogOpen={setIsAddFileDialogOpen}
        onCreateBundle={handleCreateNewBundle}
        onAddFile={handleAddFileWithParams}
        bundleHasMainFile={bundleHasMainFile}
      />
    </div>
  );
};

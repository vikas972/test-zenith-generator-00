
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
  selectedBundleId,
  selectedSource
}: RequirementBundleSectionProps) => {
  const {
    isNewBundleDialogOpen,
    setIsNewBundleDialogOpen,
    isAddFileDialogOpen,
    setIsAddFileDialogOpen,
    expandedBundles,
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

  return (
    <div className="space-y-6">
      <Card className="shadow-sm border-gray-200">
        <BundleHeader onCreateBundle={() => {
          if (!selectedSource) {
            toast.error("Please select a source type first");
            return;
          }
          setIsNewBundleDialogOpen(true);
        }} />
        <CardContent>
          <BundleList 
            bundles={bundles}
            expandedBundles={expandedBundles}
            selectedBundleId={selectedBundleId}
            onToggleExpand={toggleExpandBundle}
            onDeleteBundle={onBundleDelete}
            onRetryBundle={onBundleRetry}
            onAddFile={handleAddFileToBundle}
            onDeleteFile={handleDeleteFile}
            onSelectBundle={onSelectBundle}
            onCreateBundle={() => {
              if (!selectedSource) {
                toast.error("Please select a source type first");
                return;
              }
              setIsNewBundleDialogOpen(true);
            }}
          />
        </CardContent>
      </Card>

      <DialogManager 
        isNewBundleDialogOpen={isNewBundleDialogOpen}
        setIsNewBundleDialogOpen={setIsNewBundleDialogOpen}
        isAddFileDialogOpen={isAddFileDialogOpen}
        setIsAddFileDialogOpen={setIsAddFileDialogOpen}
        onCreateBundle={handleCreateNewBundle}
        onAddFile={handleAddFile}
        bundleHasMainFile={bundleHasMainFile}
      />
    </div>
  );
};


import { useState } from "react";
import { toast } from "sonner";
import { RequirementBundle, SelectedFile } from "../types";

export const useSelectionState = (onFileSelect: (file: SelectedFile | null) => void) => {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [selectedBundleId, setSelectedBundleId] = useState<string | null>(null);
  
  const handleSelectBundle = (bundleId: string | null, bundles: RequirementBundle[]) => {
    setSelectedBundleId(bundleId);
    
    if (bundleId) {
      const bundle = bundles.find(b => b.id === bundleId);
      if (bundle && bundle.status === "imported") {
        // Convert the bundle to the format expected by the onFileSelect prop
        const mainFile = bundle.files.find(f => f.category === "main");
        if (mainFile) {
          onFileSelect({
            id: mainFile.id,
            name: mainFile.name,
            uploadTime: mainFile.uploadTime
          });
          toast.success(`Selected bundle: ${bundle.name}`);
        }
      } else {
        onFileSelect(null);
        if (bundle) {
          toast.error(`Bundle "${bundle.name}" must be imported before it can be selected`);
        }
      }
    } else {
      onFileSelect(null);
    }
  };

  return {
    selectedSource,
    setSelectedSource,
    selectedBundleId,
    handleSelectBundle
  };
};

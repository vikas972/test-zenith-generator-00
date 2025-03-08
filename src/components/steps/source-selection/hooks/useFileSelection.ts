
import { useState } from "react";
import { toast } from "sonner";
import { RequirementBundle, RequirementFile } from "../types";

type BundlesUpdater = (prevBundles: RequirementBundle[]) => RequirementBundle[];

export const useFileSelection = (
  selectedSource: string | null, 
  handleBundleUpdate: (bundleId: string, files: RequirementFile[]) => void,
  handleBundleAdd: (bundle: RequirementBundle) => void
) => {
  const handleSourceFileSelect = (file: File) => {
    if (!selectedSource) {
      toast.error("Please select a source type first");
      return;
    }
    
    // When a file is selected via the import sources grid,
    // we'll create a new bundle with this file
    const newBundle: RequirementBundle = {
      id: `bundle-${Date.now()}`,
      name: `Bundle from ${file.name}`,
      createdAt: new Date(),
      source: selectedSource,
      files: [],
      totalFiles: 1,
      status: "incomplete"
    };

    handleBundleAdd(newBundle);
    
    // Simulate adding the file to the bundle
    setTimeout(() => {
      const newFile: RequirementFile = {
        id: `file-${Date.now()}`,
        name: file.name.replace(/\.[^/.]+$/, ""),
        uploadTime: new Date(),
        category: "main",
        breakRequirementsBy: "section",
        context: "",
        status: "parsing",
        file
      };
      
      handleBundleUpdate(newBundle.id, [newFile]);

      // Simulate parsing completion
      setTimeout(() => {
        handleBundleUpdate(
          newBundle.id,
          [{ ...newFile, status: "completed" }]
        );
      }, 2000);
    }, 500);
    
    toast.success(`File "${file.name}" selected for processing`);
  };

  return { handleSourceFileSelect };
};

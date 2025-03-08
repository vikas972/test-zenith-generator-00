import { useState } from "react";
import { toast } from "sonner";
import { RequirementBundle, RequirementFile } from "../types";

interface UseBundleManagerProps {
  bundles: RequirementBundle[];
  onBundleAdd: (bundle: RequirementBundle) => void;
  onBundleUpdate: (bundleId: string, files: RequirementFile[]) => void;
  selectedBundleId: string | null;
  selectedSource: string | null;
}

export const useBundleManager = ({
  bundles,
  onBundleAdd,
  onBundleUpdate,
  selectedBundleId,
  selectedSource
}: UseBundleManagerProps) => {
  const [isNewBundleDialogOpen, setIsNewBundleDialogOpen] = useState(false);
  const [isAddFileDialogOpen, setIsAddFileDialogOpen] = useState(false);
  const [expandedBundleId, setExpandedBundleId] = useState<string | null>(null);
  const [selectedBundleForFile, setSelectedBundleForFile] = useState<string | null>(null);

  const toggleExpandBundle = (bundleId: string) => {
    setExpandedBundleId(prev => prev === bundleId ? null : bundleId);
  };

  const handleCreateNewBundle = (name: string, totalFiles: number) => {
    if (!name.trim()) {
      toast.error("Bundle name is required");
      return;
    }

    if (!selectedSource) {
      toast.error("Please select a source type first");
      return;
    }

    const newBundle: RequirementBundle = {
      id: `bundle-${Date.now()}`,
      name: name,
      createdAt: new Date(),
      source: selectedSource,
      files: [],
      totalFiles: totalFiles,
      status: "incomplete"
    };

    onBundleAdd(newBundle);
    setIsNewBundleDialogOpen(false);
    toast.success("New requirement bundle created");
    
    setExpandedBundleId(newBundle.id);
  };

  const handleAddFileToBundle = (bundleId: string) => {
    setSelectedBundleForFile(bundleId);
    setIsAddFileDialogOpen(true);
    setExpandedBundleId(bundleId);
  };

  const handleAddFile = (
    file: File, 
    name: string, 
    category: "main" | "supporting", 
    breakBy: "userJourney" | "userStories" | "section" | "paragraph" | "page",
    context: string,
    requirementType: string
  ) => {
    if (!selectedBundleForFile) {
      toast.error("Bundle not found");
      return;
    }

    const bundle = bundles.find(b => b.id === selectedBundleForFile);
    
    if (!bundle) {
      toast.error("Bundle not found");
      return;
    }

    if (category === "main" && bundle.files.some(f => f.category === "main")) {
      toast.error("This bundle already has a main document");
      return;
    }

    const newRequirementFile: RequirementFile = {
      id: `file-${Date.now()}`,
      name: name,
      uploadTime: new Date(),
      category: category,
      breakRequirementsBy: breakBy,
      context: context,
      status: "parsing",
      file: file
    };

    const updatedFiles = [...bundle.files, newRequirementFile];
    
    onBundleUpdate(selectedBundleForFile, updatedFiles);
    
    setIsAddFileDialogOpen(false);
    setSelectedBundleForFile(null);
    toast.success(`File added to bundle "${bundle.name}"`);
    
    setExpandedBundleId(selectedBundleForFile);

    setTimeout(() => {
      onBundleUpdate(
        selectedBundleForFile, 
        updatedFiles.map(f => 
          f.id === newRequirementFile.id 
            ? { ...f, status: "completed" } 
            : f
        )
      );
    }, 2000);
  };

  const bundleHasMainFile = selectedBundleForFile 
    ? bundles.find(b => b.id === selectedBundleForFile)?.files.some(f => f.category === "main") ?? false
    : false;

  return {
    isNewBundleDialogOpen,
    setIsNewBundleDialogOpen,
    isAddFileDialogOpen,
    setIsAddFileDialogOpen,
    expandedBundleId,
    setExpandedBundleId,
    selectedBundleForFile,
    bundleHasMainFile,
    toggleExpandBundle,
    handleCreateNewBundle,
    handleAddFileToBundle,
    handleAddFile
  };
};

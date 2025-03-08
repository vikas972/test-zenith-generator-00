import { useState, useEffect } from "react";
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
  selectedSource
}: UseBundleManagerProps) => {
  const [isNewBundleDialogOpen, setIsNewBundleDialogOpen] = useState(false);
  const [isAddFileDialogOpen, setIsAddFileDialogOpen] = useState(false);
  const [expandedBundleId, setExpandedBundleId] = useState<string | null>(null);
  const [activeBundleId, setActiveBundleId] = useState<string | null>(null);
  const [bundleHasMainFile, setBundleHasMainFile] = useState(false);

  // Check if the active bundle has a main file when active bundle changes
  useEffect(() => {
    if (activeBundleId) {
      const activeBundle = bundles.find(b => b.id === activeBundleId);
      const hasMainFile = activeBundle?.files.some(f => f.category === "main") || false;
      setBundleHasMainFile(hasMainFile);
    } else {
      setBundleHasMainFile(false);
    }
  }, [activeBundleId, bundles]);

  // Toggle expand/collapse of a bundle
  const toggleExpandBundle = (bundleId: string) => {
    // If clicking the already expanded bundle, collapse it
    if (expandedBundleId === bundleId) {
      setExpandedBundleId(null);
    } else {
      // Otherwise, expand this one and collapse any other
      setExpandedBundleId(bundleId);
    }
  };

  // Create a new bundle
  const handleCreateNewBundle = (name: string, totalFiles: number) => {
    const newBundle: RequirementBundle = {
      id: `bundle-${Date.now()}`,
      name,
      createdAt: new Date(),
      source: selectedSource || "unknown",
      files: [],
      totalFiles,
      status: "incomplete"
    };
    
    onBundleAdd(newBundle);
    setIsNewBundleDialogOpen(false);
    
    // Auto-expand the newly created bundle
    setExpandedBundleId(newBundle.id);
    
    toast.success(`Bundle "${name}" created`);
  };

  // Handle adding a file to a bundle
  const handleAddFileToBundle = (bundleId: string) => {
    const bundle = bundles.find(b => b.id === bundleId);
    if (!bundle) return;
    
    // Check if bundle already has all the files
    if (bundle.files.length >= bundle.totalFiles) {
      toast.error(`Bundle already has ${bundle.totalFiles} files`);
      return;
    }
    
    // Set active bundle and open add file dialog
    setActiveBundleId(bundleId);
    
    // Check if the bundle has a main file
    const hasMainFile = bundle.files.some(f => f.category === "main");
    setBundleHasMainFile(hasMainFile);
    
    setIsAddFileDialogOpen(true);
    
    // Make sure the bundle is expanded when adding files
    setExpandedBundleId(bundleId);
  };

  // Handle the actual file addition
  const handleAddFile = (
    file: File, 
    name: string, 
    category: "main" | "supporting", 
    breakBy: "userJourney" | "userStories" | "section" | "paragraph" | "page",
    context: string,
    requirementType: string
  ) => {
    if (!activeBundleId) return;
    
    const bundle = bundles.find(b => b.id === activeBundleId);
    if (!bundle) return;
    
    // Create a new file
    const newFile: RequirementFile = {
      id: `file-${Date.now()}`,
      name,
      uploadTime: new Date(),
      category,
      breakRequirementsBy: breakBy,
      context,
      status: "parsing",
      file
    };
    
    // Add the file to the bundle
    const updatedFiles = [...bundle.files, newFile];
    onBundleUpdate(activeBundleId, updatedFiles);
    
    // Close the dialog
    setIsAddFileDialogOpen(false);
    
    toast.success(`File "${name}" added to bundle "${bundle.name}"`);
    
    // Simulate file processing
    setTimeout(() => {
      // Update the file status to completed
      const processedFiles = updatedFiles.map(f => 
        f.id === newFile.id ? { ...f, status: "completed" } : f
      );
      
      onBundleUpdate(activeBundleId, processedFiles);
      
      // Update bundle status if all files are added
      if (processedFiles.length === bundle.totalFiles) {
        const allCompleted = processedFiles.every(f => f.status === "completed");
        if (allCompleted) {
          const updatedBundle = { ...bundle, status: "completed" };
          onBundleAdd(updatedBundle);
        }
      }
    }, 2000);
  };

  return {
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
  };
};

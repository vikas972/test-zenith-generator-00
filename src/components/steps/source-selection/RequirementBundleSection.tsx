
import { useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RequirementBundle, RequirementFile } from "./types";
import { BundleItem } from "./components/BundleItem";
import { NewBundleDialog } from "./components/NewBundleDialog";
import { AddFileDialog } from "./components/AddFileDialog";
import { EmptyBundleState } from "./components/EmptyBundleState";

interface RequirementBundleSectionProps {
  bundles: RequirementBundle[];
  onBundleAdd: (bundle: RequirementBundle) => void;
  onBundleUpdate: (bundleId: string, files: RequirementFile[]) => void;
  onBundleDelete: (bundleId: string) => void;
  onBundleRetry: (bundleId: string) => void;
  onSelectBundle: (bundleId: string | null) => void;
  selectedBundleId: string | null;
}

export const RequirementBundleSection = ({
  bundles,
  onBundleAdd,
  onBundleUpdate,
  onBundleDelete,
  onBundleRetry,
  onSelectBundle,
  selectedBundleId
}: RequirementBundleSectionProps) => {
  const [isNewBundleDialogOpen, setIsNewBundleDialogOpen] = useState(false);
  const [isAddFileDialogOpen, setIsAddFileDialogOpen] = useState(false);
  const [expandedBundles, setExpandedBundles] = useState<string[]>([]);
  const [selectedBundleForFile, setSelectedBundleForFile] = useState<string | null>(null);

  const toggleExpandBundle = (bundleId: string) => {
    setExpandedBundles(prev => 
      prev.includes(bundleId) 
        ? prev.filter(id => id !== bundleId)
        : [...prev, bundleId]
    );
  };

  const handleCreateNewBundle = (name: string, totalFiles: number) => {
    if (!name.trim()) {
      toast.error("Bundle name is required");
      return;
    }

    const newBundle: RequirementBundle = {
      id: `bundle-${Date.now()}`,
      name: name,
      createdAt: new Date(),
      files: [],
      totalFiles: totalFiles,
      status: "incomplete"
    };

    onBundleAdd(newBundle);
    setIsNewBundleDialogOpen(false);
    toast.success("New requirement bundle created");
  };

  const handleAddFileToBundle = (bundleId: string) => {
    setSelectedBundleForFile(bundleId);
    setIsAddFileDialogOpen(true);
  };

  const handleAddFile = (
    file: File, 
    name: string, 
    category: "main" | "supporting", 
    breakBy: "userJourney" | "userStories" | "section" | "paragraph" | "page",
    context: string
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

    // Check if this bundle already has a main file if trying to add a main file
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
    toast.success(`File added to bundle "${bundle.name}"`);
    
    // Automatically expand the bundle when adding a file
    if (!expandedBundles.includes(selectedBundleForFile)) {
      setExpandedBundles(prev => [...prev, selectedBundleForFile]);
    }

    // Start parsing simulation
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

  const handleDeleteFile = (bundleId: string, fileId: string) => {
    const bundle = bundles.find(b => b.id === bundleId);
    if (!bundle) return;
    
    const updatedFiles = bundle.files.filter(f => f.id !== fileId);
    onBundleUpdate(bundleId, updatedFiles);
    toast.success("File removed from bundle");
  };

  const bundleHasMainFile = selectedBundleForFile 
    ? bundles.find(b => b.id === selectedBundleForFile)?.files.some(f => f.category === "main") ?? false
    : false;

  return (
    <div className="space-y-6">
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">Requirement Bundles</CardTitle>
          <Button onClick={() => setIsNewBundleDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            New Bundle
          </Button>
        </CardHeader>
        <CardContent>
          {bundles.length > 0 ? (
            <div className="space-y-4">
              {bundles.map(bundle => (
                <BundleItem
                  key={bundle.id}
                  bundle={bundle}
                  isExpanded={expandedBundles.includes(bundle.id)}
                  isSelected={selectedBundleId === bundle.id}
                  onToggleExpand={toggleExpandBundle}
                  onDeleteBundle={onBundleDelete}
                  onRetryBundle={onBundleRetry}
                  onAddFile={handleAddFileToBundle}
                  onDeleteFile={handleDeleteFile}
                  onSelectBundle={onSelectBundle}
                />
              ))}
            </div>
          ) : (
            <EmptyBundleState onCreateBundle={() => setIsNewBundleDialogOpen(true)} />
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <NewBundleDialog 
        isOpen={isNewBundleDialogOpen}
        onOpenChange={setIsNewBundleDialogOpen}
        onCreateBundle={handleCreateNewBundle}
      />

      <AddFileDialog
        isOpen={isAddFileDialogOpen}
        onOpenChange={setIsAddFileDialogOpen}
        onAddFile={handleAddFile}
        bundleHasMainFile={bundleHasMainFile}
      />
    </div>
  );
};


import { NewBundleDialog } from "../components/NewBundleDialog";
import { AddFileDialog } from "../components/AddFileDialog";

interface DialogManagerProps {
  isNewBundleDialogOpen: boolean;
  setIsNewBundleDialogOpen: (isOpen: boolean) => void;
  isAddFileDialogOpen: boolean;
  setIsAddFileDialogOpen: (isOpen: boolean) => void;
  onCreateBundle: (name: string, totalFiles: number) => void;
  onAddFile: (
    file: File,
    name: string,
    category: "main" | "supporting",
    breakBy: "userJourney" | "userStories" | "section" | "paragraph" | "page",
    context: string,
    requirementType: string
  ) => void;
  bundleHasMainFile: boolean;
}

export const DialogManager = ({
  isNewBundleDialogOpen,
  setIsNewBundleDialogOpen,
  isAddFileDialogOpen,
  setIsAddFileDialogOpen,
  onCreateBundle,
  onAddFile,
  bundleHasMainFile
}: DialogManagerProps) => {
  return (
    <>
      <NewBundleDialog
        isOpen={isNewBundleDialogOpen}
        onOpenChange={setIsNewBundleDialogOpen}
        onCreateBundle={onCreateBundle}
      />

      <AddFileDialog
        isOpen={isAddFileDialogOpen}
        onOpenChange={setIsAddFileDialogOpen}
        onAddFile={onAddFile}
        bundleHasMainFile={bundleHasMainFile}
      />
    </>
  );
};

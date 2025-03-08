
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileUploadArea } from "./file-dialog/FileUploadArea";
import { FileMetadataForm } from "./file-dialog/FileMetadataForm";

interface AddFileDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddFile: (
    file: File, 
    name: string, 
    category: "main" | "supporting", 
    breakBy: "userJourney" | "userStories" | "section" | "paragraph" | "page",
    context: string
  ) => void;
  bundleHasMainFile: boolean;
}

export const AddFileDialog = ({
  isOpen,
  onOpenChange,
  onAddFile,
  bundleHasMainFile
}: AddFileDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [fileCategory, setFileCategory] = useState<"main" | "supporting">("supporting");
  const [fileBreakBy, setFileBreakBy] = useState<"userJourney" | "userStories" | "section" | "paragraph" | "page">("section");
  const [fileContext, setFileContext] = useState("");

  const handleAddFile = () => {
    if (file && fileName.trim()) {
      onAddFile(file, fileName, fileCategory, fileBreakBy, fileContext);
    }
  };

  const resetState = () => {
    setFile(null);
    setFileName("");
    setFileCategory("supporting");
    setFileBreakBy("section");
    setFileContext("");
  };

  // Update filename when file changes
  const handleFileChange = (newFile: File | null) => {
    setFile(newFile);
    if (newFile) {
      setFileName(newFile.name.replace(/\.[^/.]+$/, ""));
    }
  };

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(open) => {
        if (!open) resetState();
        onOpenChange(open);
      }}
    >
      <DialogContent className="sm:max-w-[500px] max-h-[90vh]">
        <DialogHeader className="py-2">
          <DialogTitle>Add File to Bundle</DialogTitle>
        </DialogHeader>
        <ScrollArea className="pr-4 max-h-[calc(90vh-120px)]">
          <div className="space-y-3 py-2">
            <FileUploadArea 
              file={file} 
              setFile={handleFileChange} 
            />
            
            <FileMetadataForm 
              fileName={fileName}
              setFileName={setFileName}
              fileCategory={fileCategory}
              setFileCategory={setFileCategory}
              fileBreakBy={fileBreakBy}
              setFileBreakBy={setFileBreakBy}
              fileContext={fileContext}
              setFileContext={setFileContext}
              bundleHasMainFile={bundleHasMainFile}
            />
          </div>
        </ScrollArea>
        <DialogFooter className="pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} size="sm">
            Cancel
          </Button>
          <Button onClick={handleAddFile} disabled={!file || !fileName} size="sm">
            Add File
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

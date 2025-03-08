
import { useState } from "react";
import { Upload, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setFileName(droppedFile.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleAddFile = () => {
    if (file && fileName.trim()) {
      onAddFile(file, fileName, fileCategory, fileBreakBy, fileContext);
      
      // Reset state
      setFile(null);
      setFileName("");
      setFileCategory("supporting");
      setFileBreakBy("section");
      setFileContext("");
    }
  };

  const resetState = () => {
    setFile(null);
    setFileName("");
    setFileCategory("supporting");
    setFileBreakBy("section");
    setFileContext("");
  };

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(open) => {
        if (!open) resetState();
        onOpenChange(open);
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add File to Bundle</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div 
            className={`space-y-2 border-2 border-dashed rounded-lg p-4 transition-colors ${
              isDragging ? "border-primary bg-primary/5" : "border-gray-200"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Label>Document File</Label>
            <div className="flex flex-col items-center justify-center gap-2 py-4">
              <Upload className="h-8 w-8 text-gray-400" />
              <p className="text-sm text-gray-500">
                Drag and drop your file here, or
              </p>
              <label htmlFor="file-upload">
                <Input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                  onChange={handleFileChange}
                />
                <Button variant="outline" size="sm" className="cursor-pointer" onClick={() => document.getElementById('file-upload')?.click()}>
                  Browse Files
                </Button>
              </label>
              <p className="text-xs text-gray-400">
                Supports: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX
              </p>
            </div>
            {file && (
              <div className="flex items-center justify-between mt-2 p-2 bg-gray-50 rounded">
                <span className="text-sm truncate max-w-[80%]">{file.name}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setFile(null)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Document Name</Label>
            <Input 
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Enter document name"
            />
          </div>

          <div className="space-y-2">
            <Label>File Category</Label>
            <Select 
              value={fileCategory}
              onValueChange={(value: "main" | "supporting") => setFileCategory(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main" disabled={bundleHasMainFile}>Main Requirement Document</SelectItem>
                <SelectItem value="supporting">Supporting Requirement Document</SelectItem>
              </SelectContent>
            </Select>
            {bundleHasMainFile && fileCategory === "supporting" && (
              <p className="text-xs text-amber-600">This bundle already has a main document</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Break Requirements By</Label>
            <Select 
              value={fileBreakBy}
              onValueChange={(value: "userJourney" | "userStories" | "section" | "paragraph" | "page") => setFileBreakBy(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="userJourney">User Journey</SelectItem>
                <SelectItem value="userStories">User Stories</SelectItem>
                <SelectItem value="section">Section</SelectItem>
                <SelectItem value="paragraph">Paragraph</SelectItem>
                <SelectItem value="page">Page</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Additional Context for SPA Agent</Label>
            <Textarea 
              value={fileContext}
              onChange={(e) => setFileContext(e.target.value)}
              placeholder="Provide any additional context that will help the SPA agent process this document..."
              className="h-20"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddFile} disabled={!file || !fileName}>
            Add File
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

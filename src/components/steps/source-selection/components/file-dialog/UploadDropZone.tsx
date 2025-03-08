
import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UploadDropZoneProps {
  onFileSelect: (file: File) => void;
  acceptedFileTypes: string;
}

export const UploadDropZone = ({ 
  onFileSelect, 
  acceptedFileTypes 
}: UploadDropZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

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
      onFileSelect(droppedFile);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-3 transition-colors ${
        isDragging ? "border-primary bg-primary/5" : "border-gray-200"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center gap-1 py-2">
        <Upload className="h-6 w-6 text-gray-400" />
        <p className="text-xs text-gray-500">
          Drag and drop your file here, or
        </p>
        <label htmlFor="file-upload">
          <Input
            id="file-upload"
            type="file"
            className="hidden"
            accept={acceptedFileTypes}
            onChange={handleFileInputChange}
          />
          <Button variant="outline" size="sm" className="cursor-pointer h-8" onClick={() => document.getElementById('file-upload')?.click()}>
            Browse Files
          </Button>
        </label>
        <p className="text-xs text-gray-400 mt-1">
          Supports: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX
        </p>
      </div>
    </div>
  );
};

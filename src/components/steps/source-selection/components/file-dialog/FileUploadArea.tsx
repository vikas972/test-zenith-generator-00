
import { useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FileUploadAreaProps {
  file: File | null;
  setFile: (file: File | null) => void;
}

export const FileUploadArea = ({ file, setFile }: FileUploadAreaProps) => {
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
      setFile(droppedFile);
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
      <Label className="text-sm font-medium mb-1 block">Document File</Label>
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
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) {
                setFile(selectedFile);
              }
            }}
          />
          <Button variant="outline" size="sm" className="cursor-pointer h-8" onClick={() => document.getElementById('file-upload')?.click()}>
            Browse Files
          </Button>
        </label>
        <p className="text-xs text-gray-400 mt-1">
          Supports: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX
        </p>
      </div>
      {file && (
        <div className="flex items-center justify-between mt-2 p-1 bg-gray-50 rounded">
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
  );
};

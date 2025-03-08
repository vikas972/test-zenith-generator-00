
import { Label } from "@/components/ui/label";
import { UploadDropZone } from "./UploadDropZone";
import { FilePreview } from "./FilePreview";

interface FileUploadAreaProps {
  file: File | null;
  setFile: (file: File | null) => void;
}

export const FileUploadArea = ({ file, setFile }: FileUploadAreaProps) => {
  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  return (
    <div>
      <Label className="text-sm font-medium mb-1 block">Document File</Label>
      <UploadDropZone 
        onFileSelect={handleFileSelect}
        acceptedFileTypes=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
      />
      {file && (
        <FilePreview 
          file={file} 
          onRemove={() => setFile(null)} 
        />
      )}
    </div>
  );
};

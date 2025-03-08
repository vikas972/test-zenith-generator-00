
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
}

export const FilePreview = ({ file, onRemove }: FilePreviewProps) => {
  return (
    <div className="flex items-center justify-between mt-2 p-1 bg-gray-50 rounded">
      <span className="text-sm truncate max-w-[80%]">{file.name}</span>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onRemove}
        className="h-6 w-6 p-0"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

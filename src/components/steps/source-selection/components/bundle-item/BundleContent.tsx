
import { Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequirementBundle } from "../../types";
import { FileItem } from "../FileItem";

interface BundleContentProps {
  bundle: RequirementBundle;
  onAddFile: () => void;
  onDeleteFile: (fileId: string) => void;
  onImport: (e: React.MouseEvent) => void;
  isImporting: boolean;
  isSelected: boolean;
}

export const BundleContent = ({ 
  bundle, 
  onAddFile, 
  onDeleteFile,
  onImport,
  isImporting,
  isSelected
}: BundleContentProps) => {
  // Bundle can be imported when all files are completed and not already imported
  const isImportable = bundle.status === "completed" && bundle.files.every(f => f.status === "completed");
  const isImported = bundle.status === "imported";

  return (
    <div className="p-4 border-t">
      {bundle.files.length > 0 ? (
        <div className="space-y-3">
          {bundle.files.map(file => (
            <FileItem 
              key={file.id} 
              file={file} 
              onDeleteFile={() => onDeleteFile(file.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-4 text-gray-500">
          No files in this bundle yet.
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onAddFile}
            className="ml-2"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add File
          </Button>
        </div>
      )}
      
      {bundle.files.length > 0 && (
        <div className="mt-4 border-t pt-4 flex justify-end">
          <Button 
            variant="default" 
            onClick={onImport}
            disabled={!isImportable || isImporting || isImported || !isSelected}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            {isImported ? "Imported" : isImporting ? "Importing..." : "Import Bundle"}
          </Button>
        </div>
      )}
    </div>
  );
};

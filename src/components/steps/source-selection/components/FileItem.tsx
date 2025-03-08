
import { Check, RefreshCw, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequirementFile } from "../types";

interface FileItemProps {
  file: RequirementFile;
  onDeleteFile: () => void;
}

export const FileItem = ({ file, onDeleteFile }: FileItemProps) => {
  const getFileStatusIcon = (status: RequirementFile["status"]) => {
    switch (status) {
      case "completed":
        return <Check className="h-4 w-4 text-green-500" />;
      case "failed":
        return <X className="h-4 w-4 text-red-500" />;
      case "parsing":
        return <RefreshCw className="h-4 w-4 text-yellow-500 animate-spin" />;
      case "importing":
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case "imported":
        return <Check className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-between p-3 bg-white rounded border">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center bg-gray-100 rounded-full p-1">
          {getFileStatusIcon(file.status)}
        </div>
        <div>
          <div className="font-medium">{file.name}</div>
          <div className="text-xs text-gray-500 flex gap-3">
            <span className="capitalize">{file.category} Document</span>
            <span>Break by: {file.breakRequirementsBy.replace(/([A-Z])/g, ' $1').trim()}</span>
            <span>Status: {file.status}</span>
          </div>
        </div>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={onDeleteFile}
        className="text-red-600 hover:text-red-700 hover:bg-red-50"
        disabled={file.status === "importing" || file.status === "imported"}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

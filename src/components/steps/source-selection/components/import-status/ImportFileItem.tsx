
import { RequirementFile } from "../../types";
import { Progress } from "@/components/ui/progress";
import { Check, Upload, AlertCircle, RefreshCw, FileText } from "lucide-react";

interface ImportFileItemProps {
  file: RequirementFile;
}

export const ImportFileItem = ({ file }: ImportFileItemProps) => {
  // Get appropriate status icon based on file status
  const getStatusIcon = () => {
    switch (file.status) {
      case "imported":
        return <Check className="h-4 w-4 text-green-500" />;
      case "importing":
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  // Calculate progress percentage for the file import
  const getProgress = () => {
    switch (file.status) {
      case "imported":
        return 100;
      case "importing":
        return Math.floor(Math.random() * 50) + 50; // Simulate progress between 50-99%
      case "failed":
        return 0;
      default:
        return 0;
    }
  };

  return (
    <div className="flex items-center bg-white p-3 rounded border">
      <div className="mr-3">{getStatusIcon()}</div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="font-medium text-sm truncate">{file.name}</div>
          <div className="text-xs text-gray-500 ml-2 whitespace-nowrap">
            {file.status === "imported" 
              ? "Completed" 
              : file.status === "importing" 
                ? `Importing (${getProgress()}%)` 
                : file.status
            }
          </div>
        </div>
        
        <div className="text-xs text-gray-500 flex flex-wrap gap-2 mb-1">
          <span className="capitalize">{file.category} Document</span>
          <span>Break by: {file.breakRequirementsBy.replace(/([A-Z])/g, ' $1').trim()}</span>
        </div>
        
        {file.status === "importing" && (
          <Progress value={getProgress()} className="h-1 mt-1" />
        )}
      </div>
    </div>
  );
};

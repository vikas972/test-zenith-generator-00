
import { RequirementBundle } from "../../types";
import { ImportFileItem } from "./ImportFileItem";
import { Progress } from "@/components/ui/progress";
import { Check, Clock, Calendar } from "lucide-react";
import { BundleStatusBadge } from "../bundle-item/BundleStatusBadge";

interface ImportBundleItemProps {
  bundle: RequirementBundle;
}

export const ImportBundleItem = ({ bundle }: ImportBundleItemProps) => {
  // Calculate import progress percentage
  const getImportProgress = () => {
    if (bundle.status === "imported") return 100;
    
    const totalFiles = bundle.files.length;
    if (totalFiles === 0) return 0;
    
    const importedFiles = bundle.files.filter(f => f.status === "imported").length;
    return Math.round((importedFiles / totalFiles) * 100);
  };

  const progress = getImportProgress();
  const isImporting = bundle.status === "importing";
  const isCompleted = bundle.status === "imported";
  const importedCount = bundle.files.filter(f => f.status === "imported").length;
  const totalCount = bundle.files.length;

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <div className="bg-gray-50 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="font-medium flex items-center gap-2 text-lg">
            {bundle.name}
            {isCompleted && <Check className="h-5 w-5 text-green-500" />}
          </div>
          <BundleStatusBadge status={bundle.status} />
        </div>
        
        <div className="flex items-center justify-between mb-2 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Created: {bundle.createdAt.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>
              {isCompleted 
                ? "Imported" 
                : isImporting 
                  ? `Importing (${importedCount}/${totalCount} files)` 
                  : "Pending import"
              }
            </span>
          </div>
        </div>
        
        <Progress value={progress} className="h-2" />
      </div>
      
      <div className="p-4 border-t bg-gray-50/50">
        <h3 className="text-sm font-medium mb-3">Files ({bundle.files.length})</h3>
        <div className="space-y-3">
          {bundle.files.map(file => (
            <ImportFileItem key={file.id} file={file} />
          ))}
        </div>
      </div>
    </div>
  );
};

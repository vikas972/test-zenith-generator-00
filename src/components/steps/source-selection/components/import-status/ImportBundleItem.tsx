
import { RequirementBundle } from "../../types";
import { ImportFileItem } from "./ImportFileItem";
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";

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

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="font-medium flex items-center gap-2">
            {bundle.name}
            {isCompleted && <Check className="h-4 w-4 text-green-500" />}
          </div>
          <div className="text-sm text-gray-500">
            {isCompleted ? "Imported" : `Importing (${progress}%)`}
          </div>
        </div>
        
        <Progress value={progress} className="h-2" />
      </div>
      
      <div className="p-3 border-t">
        <div className="space-y-2">
          {bundle.files.map(file => (
            <ImportFileItem key={file.id} file={file} />
          ))}
        </div>
      </div>
    </div>
  );
};

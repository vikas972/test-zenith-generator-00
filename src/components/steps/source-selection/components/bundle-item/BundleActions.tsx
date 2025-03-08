
import { Plus, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequirementBundle } from "../../types";
import { BundleStatusBadge } from "./BundleStatusBadge";
import { BundleSourceBadge } from "./BundleSourceBadge";

interface BundleActionsProps {
  bundle: RequirementBundle;
  onAddFile: (e: React.MouseEvent) => void;
  onRetryBundle: (e: React.MouseEvent) => void;
  onDeleteBundle: (e: React.MouseEvent) => void;
  isSelected: boolean;
  onSelectBundle: () => void;
  isAllFilesAdded: boolean;
}

export const BundleActions = ({ 
  bundle, 
  onAddFile, 
  onRetryBundle, 
  onDeleteBundle,
  isSelected,
  onSelectBundle,
  isAllFilesAdded
}: BundleActionsProps) => {
  // The bundle can be selected when bundle is completed or imported
  const isSelectable = bundle.status === "imported" || bundle.status === "completed";

  return (
    <div className="flex items-center gap-2">
      <BundleStatusBadge status={bundle.status} />
      <BundleSourceBadge sourceId={bundle.source} />
      
      <div className="flex gap-2">
        {bundle.files.length < bundle.totalFiles && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={onAddFile}
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
        
        {bundle.status === "failed" && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={onRetryBundle}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        )}
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={onDeleteBundle}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      <input
        type="radio"
        checked={isSelected}
        onChange={onSelectBundle}
        onClick={(e) => e.stopPropagation()}
        disabled={!isSelectable}
        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
      />
    </div>
  );
};

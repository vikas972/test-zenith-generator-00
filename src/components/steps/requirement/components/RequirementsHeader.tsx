
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, RefreshCw, CheckSquare, Trash2, Maximize2, Minimize2 } from "lucide-react";

interface RequirementsHeaderProps {
  fileName: string;
  isMaximized: boolean;
  selectedCount: number;
  totalCount: number;
  onSelectAll: (checked: boolean) => void;
  onAddNew: () => void;
  onRegenerate: () => void;
  onBulkStatusChange: (status: "completed" | "needs_review" | "in_progress") => void;
  onDelete: () => void;
  onToggleMaximize: () => void;
}

export const RequirementsHeader = ({
  fileName,
  isMaximized,
  selectedCount,
  totalCount,
  onSelectAll,
  onAddNew,
  onRegenerate,
  onBulkStatusChange,
  onDelete,
  onToggleMaximize,
}: RequirementsHeaderProps) => {
  return (
    <div className="p-4 border-b bg-white">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">Requirements Captured</h2>
            <span className="text-sm text-gray-500">
              Review and edit captured requirements from {fileName || "requirements.pdf"}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleMaximize}
          >
            {isMaximized ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-2 px-4">
            <Checkbox
              checked={selectedCount === totalCount && totalCount > 0}
              onCheckedChange={onSelectAll}
            />
            <span className="text-sm text-gray-500">Select All</span>
          </div>
          <Button 
            onClick={onAddNew}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Requirement
          </Button>
          <Button 
            onClick={onRegenerate}
            disabled={selectedCount === 0}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Regenerate Selected
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                className="bg-blue-500 hover:bg-blue-600"
                disabled={selectedCount === 0}
              >
                <CheckSquare className="h-4 w-4 mr-2" />
                Change Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => onBulkStatusChange("completed")}>
                Mark as Completed
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => onBulkStatusChange("needs_review")}>
                Mark as Needs Review
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => onBulkStatusChange("in_progress")}>
                Mark as In Progress
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button 
            onClick={onDelete}
            disabled={selectedCount === 0}
            variant="destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Selected
          </Button>
        </div>
      </div>
    </div>
  );
};

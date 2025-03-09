
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { LayoutGrid } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ScenarioHeaderProps {
  selectedScenariosCount: number;
  totalScenariosCount: number;
  onSelectAll: (checked: boolean) => void;
  onAddScenario: () => void;
  onBulkStatusChange: (status: "completed" | "needs_review" | "in_progress") => void;
  onBulkDelete: () => void;
  onShowGrid: () => void;
}

export const ScenarioHeader = ({
  selectedScenariosCount,
  totalScenariosCount,
  onSelectAll,
  onAddScenario,
  onBulkStatusChange,
  onBulkDelete,
  onShowGrid,
}: ScenarioHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-4 px-4 gap-2">
      <div className="flex items-center gap-2">
        <Checkbox
          id="select-all"
          checked={selectedScenariosCount === totalScenariosCount && totalScenariosCount > 0}
          onCheckedChange={(checked) => onSelectAll(checked === true)}
        />
        <label htmlFor="select-all" className="text-sm">
          {selectedScenariosCount === 0
            ? `${totalScenariosCount} Scenarios`
            : `${selectedScenariosCount} of ${totalScenariosCount} selected`}
        </label>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onShowGrid}
          className="flex items-center gap-2"
        >
          <LayoutGrid className="h-4 w-4" />
          Grid View
        </Button>
        <Button onClick={onAddScenario} size="sm">
          Add Scenario
        </Button>
        {selectedScenariosCount > 0 && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onBulkStatusChange("completed")}>
                  Mark as Completed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onBulkStatusChange("needs_review")}>
                  Mark as Needs Review
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onBulkStatusChange("in_progress")}>
                  Mark as In Progress
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="destructive"
              size="sm"
              onClick={onBulkDelete}
            >
              Delete
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

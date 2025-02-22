
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Grid, Plus, Trash2, CheckSquare } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type ScenarioStatus } from "../types";

interface ScenarioHeaderProps {
  selectedScenariosCount: number;
  totalScenariosCount: number;
  onSelectAll: (checked: boolean) => void;
  onAddScenario: () => void;
  onBulkStatusChange: (status: ScenarioStatus) => void;
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
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Checkbox
          checked={selectedScenariosCount === totalScenariosCount}
          onClick={(e) => e.stopPropagation()}
          onCheckedChange={(checked) => onSelectAll(checked as boolean)}
        />
        <h2 className="text-lg font-semibold">Test Scenarios</h2>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline"
          onClick={onShowGrid}
        >
          <Grid className="h-4 w-4 mr-2" />
          View Grid
        </Button>
        <Button 
          className="bg-blue-500 hover:bg-blue-600"
          onClick={onAddScenario}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Scenario
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="bg-blue-500 hover:bg-blue-600"
              disabled={selectedScenariosCount === 0}
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
          onClick={onBulkDelete}
          disabled={selectedScenariosCount === 0}
          variant="destructive"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Selected
        </Button>
      </div>
    </div>
  );
};

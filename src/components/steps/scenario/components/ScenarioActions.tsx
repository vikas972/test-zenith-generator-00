
import { Button } from "@/components/ui/button";
import { type TestScenario } from "../types";
import { toast } from "sonner";

interface ScenarioActionsProps {
  scenarios: TestScenario[];
  selectedScenarios: string[];
  setScenarios: (scenarios: TestScenario[]) => void;
  setSelectedScenarios: (selectedScenarios: string[]) => void;
}

export const ScenarioActions = ({
  scenarios,
  selectedScenarios,
  setScenarios,
  setSelectedScenarios
}: ScenarioActionsProps) => {
  const handleBulkDelete = () => {
    if (selectedScenarios.length === 0) {
      toast("Please select at least one scenario to delete");
      return;
    }

    setScenarios(scenarios.filter(scenario => !selectedScenarios.includes(scenario.id)));
    setSelectedScenarios([]);
    toast("Deleted scenarios successfully");
  };

  return (
    <div className="space-x-2">
      <Button
        variant="destructive"
        onClick={handleBulkDelete}
        disabled={selectedScenarios.length === 0}
      >
        Delete Selected
      </Button>
    </div>
  );
};

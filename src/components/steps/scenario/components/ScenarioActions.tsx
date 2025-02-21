
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
      toast({
        title: "Error",
        description: "Please select at least one scenario to delete",
        variant: "destructive",
      });
      return;
    }

    setScenarios(scenarios.filter(scenario => !selectedScenarios.includes(scenario.id)));
    setSelectedScenarios([]);
    toast({
      title: "Success",
      description: `Deleted ${selectedScenarios.length} scenarios`
    });
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

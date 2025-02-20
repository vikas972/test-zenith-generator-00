
import { useState } from "react";
import { type TestScenarioFlow, type FlowType } from "./types";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { AddConditionDialog } from "./dialogs/AddConditionDialog";
import { useToast } from "@/components/ui/use-toast";

interface ScenarioFlowsProps {
  flows: TestScenarioFlow[];
  onUpdateFlows: (flows: TestScenarioFlow[]) => void;
}

const getFlowTypeIcon = (type: FlowType) => {
  switch (type) {
    case "primary":
      return "→";
    case "alternate":
      return "⤷";
    case "negative":
      return "⚠";
    case "exception":
      return "⚡";
    default:
      return "•";
  }
};

export const ScenarioFlows = ({ flows, onUpdateFlows }: ScenarioFlowsProps) => {
  const { toast } = useToast();
  const [activeFlow, setActiveFlow] = useState<{ type: FlowType; index: number } | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const handleAddCondition = (flow: TestScenarioFlow, index: number) => {
    setActiveFlow({ type: flow.type, index });
    setShowAddDialog(true);
  };

  const handleDeleteCondition = (flowIndex: number, subflowIndex: number) => {
    const newFlows = [...flows];
    newFlows[flowIndex].subflows = newFlows[flowIndex].subflows.filter(
      (_, index) => index !== subflowIndex
    );
    onUpdateFlows(newFlows);
    toast({
      title: "Success",
      description: "Condition deleted successfully"
    });
  };

  const handleAddNewCondition = (condition: { 
    name: string; 
    coverage: string; 
    expectedResults: string 
  }) => {
    if (activeFlow) {
      const newFlows = [...flows];
      newFlows[activeFlow.index].subflows.push(condition);
      onUpdateFlows(newFlows);
      toast({
        title: "Success",
        description: "New condition added successfully"
      });
    }
  };

  return (
    <div className="mt-4 space-y-4">
      {flows.map((flow, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">
              {index + 1}. {flow.type.charAt(0).toUpperCase() + flow.type.slice(1)} Flow
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleAddCondition(flow, index)}
            >
              <Plus className="h-4 w-4" />
              Add Condition
            </Button>
          </div>
          <div className="text-sm text-gray-600 ml-4">
            Description: {flow.description}
          </div>
          <div className="space-y-2 ml-6">
            {flow.subflows.map((subflow, subIndex) => (
              <div key={subIndex} className="text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-gray-400">{getFlowTypeIcon(flow.type)}</span>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-start justify-between">
                      <div className="font-medium">{subflow.name}</div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCondition(index, subIndex)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                    <div className="text-gray-600">Coverage: {subflow.coverage}</div>
                    <div className="text-gray-600">Expected Results: {subflow.expectedResults}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <AddConditionDialog
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onAdd={handleAddNewCondition}
      />
    </div>
  );
};

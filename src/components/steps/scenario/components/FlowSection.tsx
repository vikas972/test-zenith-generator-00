
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TestScenarioFlow } from "../types";
import { FlowCondition } from "./FlowCondition";

interface FlowSectionProps {
  flow: TestScenarioFlow;
  flowIndex: number;
  editingState: {
    flowIndex: number;
    subflowIndex: number;
    field: string | null;
    value: string;
  } | null;
  onAddCondition: (flow: TestScenarioFlow, index: number) => void;
  onEditCondition: (flowIndex: number, subflowIndex: number, field: string, value: string) => void;
  onDeleteCondition: (flowIndex: number, subflowIndex: number) => void;
  onAddEntry: (flowIndex: number, subflowIndex: number) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onEditingChange: (value: string) => void;
}

export const FlowSection = ({
  flow,
  flowIndex,
  editingState,
  onAddCondition,
  onEditCondition,
  onDeleteCondition,
  onAddEntry,
  onSaveEdit,
  onCancelEdit,
  onEditingChange,
}: FlowSectionProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">
          {flowIndex + 1}. {flow.type.charAt(0).toUpperCase() + flow.type.slice(1)} Flow
        </h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onAddCondition(flow, flowIndex)}
        >
          <Plus className="h-4 w-4" />
          Add Condition
        </Button>
      </div>
      <div className="text-sm text-gray-600 ml-4">
        Description: {flow.description}
      </div>
      <div className="space-y-2 ml-6">
        {flow.subflows.map((subflow, subflowIndex) => (
          <FlowCondition
            key={subflowIndex}
            flowType={flow.type}
            flowIndex={flowIndex}
            subflowIndex={subflowIndex}
            name={subflow.name}
            coverage={subflow.coverage}
            expectedResults={subflow.expectedResults}
            editingState={editingState}
            onEdit={onEditCondition}
            onDelete={onDeleteCondition}
            onAddEntry={onAddEntry}
            onSaveEdit={onSaveEdit}
            onCancelEdit={onCancelEdit}
            onEditingChange={onEditingChange}
          />
        ))}
      </div>
    </div>
  );
};


import { useState } from "react";
import { type TestScenarioFlow, type FlowType, type TestScenario } from "./types";
import { AddConditionDialog } from "./dialogs/AddConditionDialog";
import { useToast } from "@/components/ui/use-toast";
import { FlowSection } from "./components/FlowSection";

export interface ScenarioFlowsProps {
  flows: TestScenarioFlow[];
  onUpdateFlows: (flows: TestScenarioFlow[]) => void;
}

export const ScenarioFlows = ({ flows, onUpdateFlows }: ScenarioFlowsProps) => {
  const { toast } = useToast();
  const [activeFlow, setActiveFlow] = useState<{ type: FlowType; index: number } | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingState, setEditingState] = useState<{
    flowIndex: number;
    subflowIndex: number;
    field: string | null;
    value: string;
  } | null>(null);

  const handleAddCondition = (e: React.MouseEvent, flow: TestScenarioFlow, index: number) => {
    e.stopPropagation(); // Prevent the tile from collapsing
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

  const handleEditClick = (flowIndex: number, subflowIndex: number, field: string, value: string) => {
    setEditingState({
      flowIndex,
      subflowIndex,
      field,
      value
    });
  };

  const handleSaveEdit = () => {
    if (editingState) {
      const newFlows = [...flows];
      const { flowIndex, subflowIndex, field, value } = editingState;
      
      if (field.startsWith('entry_')) {
        const entryIndex = parseInt(field.split('_')[1], 10);
        if (newFlows[flowIndex].subflows[subflowIndex].entries) {
          newFlows[flowIndex].subflows[subflowIndex].entries = 
            newFlows[flowIndex].subflows[subflowIndex].entries?.map((entry, index) => 
              index === entryIndex ? { description: value } : entry
            );
        }
      } else {
        newFlows[flowIndex].subflows[subflowIndex] = {
          ...newFlows[flowIndex].subflows[subflowIndex],
          [field]: value
        };
      }
      
      onUpdateFlows(newFlows);
      setEditingState(null);
      toast({
        title: "Success",
        description: "Changes saved successfully"
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingState(null);
  };

  const handleAddEntry = (flowIndex: number, subflowIndex: number) => {
    toast({
      title: "Info",
      description: "Add entry functionality coming soon"
    });
  };

  const handleDeleteEntry = (flowIndex: number, subflowIndex: number, entryIndex: number) => {
    const newFlows = [...flows];
    if (newFlows[flowIndex].subflows[subflowIndex].entries) {
      newFlows[flowIndex].subflows[subflowIndex].entries = 
        newFlows[flowIndex].subflows[subflowIndex].entries?.filter((_, index) => index !== entryIndex);
    }
    onUpdateFlows(newFlows);
    toast({
      title: "Success",
      description: "Entry deleted successfully"
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
      setShowAddDialog(false);
      toast({
        title: "Success",
        description: "New condition added successfully"
      });
    }
  };

  return (
    <div className="mt-4 space-y-4">
      {flows.map((flow, flowIndex) => (
        <FlowSection
          key={flowIndex}
          flow={flow}
          flowIndex={flowIndex}
          editingState={editingState}
          onAddCondition={handleAddCondition}
          onEditCondition={handleEditClick}
          onDeleteCondition={handleDeleteCondition}
          onAddEntry={handleAddEntry}
          onDeleteEntry={handleDeleteEntry}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={handleCancelEdit}
          onEditingChange={(value) => setEditingState(prev => prev ? { ...prev, value } : null)}
        />
      ))}

      <AddConditionDialog
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onAdd={handleAddNewCondition}
      />
    </div>
  );
};

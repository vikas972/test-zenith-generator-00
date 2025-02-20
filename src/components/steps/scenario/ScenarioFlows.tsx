
import { useState } from "react";
import { type TestScenarioFlow, type FlowType } from "./types";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit2, Save, X } from "lucide-react";
import { AddConditionDialog } from "./dialogs/AddConditionDialog";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
  const [editingState, setEditingState] = useState<{
    flowIndex: number;
    subflowIndex: number;
    field: string | null;
    value: string;
  } | null>(null);

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

  const handleEditClick = (e: React.MouseEvent, flowIndex: number, subflowIndex: number, field: string, value: string) => {
    e.stopPropagation();
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
      
      newFlows[flowIndex].subflows[subflowIndex] = {
        ...newFlows[flowIndex].subflows[subflowIndex],
        [field]: value
      };
      
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

  const handleAddEntry = (e: React.MouseEvent, flowIndex: number, subflowIndex: number) => {
    e.stopPropagation();
    toast({
      title: "Info",
      description: "Add entry functionality coming soon"
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
      {flows.map((flow, flowIndex) => (
        <div key={flowIndex} className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">
              {flowIndex + 1}. {flow.type.charAt(0).toUpperCase() + flow.type.slice(1)} Flow
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleAddCondition(flow, flowIndex)}
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
              <div key={subflowIndex} className="text-sm border rounded-md p-3">
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">{getFlowTypeIcon(flow.type)}</span>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-start justify-between">
                      <div className="font-medium">
                        {editingState?.flowIndex === flowIndex && 
                         editingState?.subflowIndex === subflowIndex && 
                         editingState?.field === "name" ? (
                          <div className="flex items-center gap-2">
                            <Input
                              value={editingState.value}
                              onChange={(e) => setEditingState({
                                ...editingState,
                                value: e.target.value
                              })}
                              className="w-[200px]"
                            />
                            <Button variant="ghost" size="sm" onClick={handleSaveEdit}>
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          subflow.name
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleAddEntry(e, flowIndex, subflowIndex)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleEditClick(e, flowIndex, subflowIndex, "name", subflow.name)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCondition(flowIndex, subflowIndex)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center justify-between text-gray-600 border-b pb-2">
                        <div>
                          {editingState?.flowIndex === flowIndex && 
                           editingState?.subflowIndex === subflowIndex && 
                           editingState?.field === "coverage" ? (
                            <div className="flex items-center gap-2">
                              <Textarea
                                value={editingState.value}
                                onChange={(e) => setEditingState({
                                  ...editingState,
                                  value: e.target.value
                                })}
                                className="w-[400px]"
                              />
                              <Button variant="ghost" size="sm" onClick={handleSaveEdit}>
                                <Save className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <>Coverage: {subflow.coverage}</>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => handleEditClick(e, flowIndex, subflowIndex, "coverage", subflow.coverage)}
                          >
                            <Edit2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-gray-600">
                        <div>
                          {editingState?.flowIndex === flowIndex && 
                           editingState?.subflowIndex === subflowIndex && 
                           editingState?.field === "expectedResults" ? (
                            <div className="flex items-center gap-2">
                              <Textarea
                                value={editingState.value}
                                onChange={(e) => setEditingState({
                                  ...editingState,
                                  value: e.target.value
                                })}
                                className="w-[400px]"
                              />
                              <Button variant="ghost" size="sm" onClick={handleSaveEdit}>
                                <Save className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <>Expected Results: {subflow.expectedResults}</>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => handleEditClick(e, flowIndex, subflowIndex, "expectedResults", subflow.expectedResults)}
                          >
                            <Edit2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
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

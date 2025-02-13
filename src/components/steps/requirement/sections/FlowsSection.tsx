
import { useState } from "react";
import { Activity, Plus, Pencil, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { type Flow } from "../types";
import { toast } from "sonner";

interface FlowsSectionProps {
  flows: Flow[];
  onAddFlow: (flow: Flow) => void;
  onUpdateFlow: (flowId: string, updatedFlow: Flow) => void;
}

export const FlowsSection = ({ flows, onAddFlow, onUpdateFlow }: FlowsSectionProps) => {
  const [editingFlow, setEditingFlow] = useState<Flow | null>(null);
  const [editValue, setEditValue] = useState("");

  const flowsByType = flows.reduce((acc, flow) => {
    const type = flow.type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(flow);
    return acc;
  }, {} as Record<string, Flow[]>);

  const handleEdit = (flow: Flow) => {
    setEditingFlow(flow);
    setEditValue(flow.description);
  };

  const handleSave = () => {
    if (editingFlow && editValue.trim()) {
      onUpdateFlow(editingFlow.id, {
        ...editingFlow,
        description: editValue.trim()
      });
      setEditingFlow(null);
      setEditValue("");
      toast.success("Flow updated successfully");
    }
  };

  const handleAddToSection = (type: "primary" | "alternative" | "exception") => {
    const newFlow: Flow = {
      id: `f${Date.now()}`,
      type,
      description: `New ${type} flow`,
      steps: [],
    };
    onAddFlow(newFlow);
    toast.success(`New ${type} flow added`);
  };

  const renderFlowSteps = (flow: Flow) => {
    if (!flow.steps?.length) return null;
    
    return (
      <div className="ml-6 space-y-2 mt-2">
        {flow.steps.map((step, index) => (
          <div key={step.id} className="flex flex-col space-y-1">
            <div className="text-sm font-medium">Step {index + 1}: {step.description}</div>
            <div className="text-sm text-gray-600 ml-4">Expected: {step.expectedOutcome}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderFlowSection = (type: "primary" | "alternative" | "exception") => {
    const title = type.charAt(0).toUpperCase() + type.slice(1);
    const flows = flowsByType[type] || [];
    
    return (
      <div key={type} className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-gray-700">{title} Flows</h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleAddToSection(type)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {flows.map((flow) => (
          <div key={flow.id} className="pl-4 py-2 border-l-2 border-gray-200">
            <div className="flex items-center justify-between group">
              {editingFlow?.id === flow.id ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="min-w-[300px]"
                  />
                  <Button variant="ghost" size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setEditingFlow(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <span className="text-sm">{flow.description}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100"
                    onClick={() => handleEdit(flow)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
            {renderFlowSteps(flow)}
            {flow.errorHandling && (
              <div className="mt-2 text-sm text-red-600">
                Error Handling: {flow.errorHandling}
              </div>
            )}
          </div>
        ))}
        {flows.length === 0 && (
          <div className="text-sm text-gray-500 italic pl-4">
            No {type} flows defined
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Activity className="h-4 w-4" />
        <h3 className="text-sm font-semibold">Functional Flows</h3>
      </div>
      <div className="space-y-6">
        {renderFlowSection("primary")}
        {renderFlowSection("alternative")}
        {renderFlowSection("exception")}
      </div>
    </div>
  );
};

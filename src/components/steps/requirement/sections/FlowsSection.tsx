
import { useState } from "react";
import { Activity, Plus, Pencil, Save, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type Flow } from "../types";
import { toast } from "sonner";

interface FlowsSectionProps {
  flows: Flow[];
  onAddFlow: (flow: Flow) => void;
  onUpdateFlow: (flowId: string, updatedFlow: Flow) => void;
}

export const FlowsSection = ({ flows, onAddFlow, onUpdateFlow }: FlowsSectionProps) => {
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");

  const flowsByType = flows.reduce((acc, flow) => {
    const type = flow.type || "primary";
    if (!acc[type]) acc[type] = [];
    acc[type].push(flow);
    return acc;
  }, {} as Record<string, Flow[]>);

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

  const renderFlowSection = (type: string, flows: Flow[]) => {
    const title = type.charAt(0).toUpperCase() + type.slice(1);
    
    return (
      <div key={type} className="space-y-2">
        <h4 className="text-sm font-semibold text-gray-700">{title} Flows</h4>
        {flows.map((flow) => (
          <div key={flow.id} className="pl-4 py-2 border-l-2 border-gray-200">
            <div className="flex items-center justify-between group">
              <span className="text-sm">{flow.description}</span>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100"
                onClick={() => {
                  setEditingItemId(flow.id);
                  setEditingValue(flow.description);
                }}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
            {renderFlowSteps(flow)}
            {flow.errorHandling && (
              <div className="mt-2 text-sm text-red-600">
                Error Handling: {flow.errorHandling}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4" />
          <h3 className="text-sm font-semibold">Functional Flows</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => {
            const newFlow: Flow = {
              id: `f${flows.length + 1}`,
              type: "primary",
              description: "New flow",
              steps: []
            };
            onAddFlow(newFlow);
            toast.success("New flow added");
          }}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-4">
        {renderFlowSection("primary", flowsByType.primary || [])}
        {renderFlowSection("alternative", flowsByType.alternative || [])}
        {renderFlowSection("exception", flowsByType.exception || [])}
      </div>
    </div>
  );
};

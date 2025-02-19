
import { Activity, Plus, Pencil, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { type Flow } from "../types";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface FlowsSectionProps {
  flows: Flow[];
  onAddClick: () => void;
}

export const FlowsSection = ({ flows, onAddClick }: FlowsSectionProps) => {
  const [editingFlowId, setEditingFlowId] = useState<string | null>(null);
  const [editedDescription, setEditedDescription] = useState("");

  const handleEditStart = (flow: Flow) => {
    setEditingFlowId(flow.id);
    setEditedDescription(flow.description);
  };

  const handleSave = (flowId: string) => {
    setEditingFlowId(null);
    // Here you would typically update the flow in the parent component
  };

  const handleCancel = () => {
    setEditingFlowId(null);
  };

  const renderFlowItem = (flow: Flow) => (
    <div key={flow.id} className="mb-2 p-2 border rounded">
      <div className="flex items-center justify-between">
        {editingFlowId === flow.id ? (
          <div className="flex-1 flex items-center gap-2">
            <Input
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="flex-1"
            />
            <Button variant="ghost" size="sm" onClick={() => handleSave(flow.id)}>
              <Save className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <div className="font-medium">{flow.description}</div>
            <Button variant="ghost" size="sm" onClick={() => handleEditStart(flow)}>
              <Pencil className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
      {!editingFlowId && flow.steps?.map(step => (
        <div key={step.id} className="ml-4 mt-1">
          <div className="text-sm">• {step.description}</div>
          <div className="text-sm text-gray-600 ml-4">
            Expected: {step.expectedOutcome}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4" />
          <h3 className="text-sm font-semibold">Functional Flows</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onAddClick}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="primary">
          <AccordionTrigger>Primary Flows</AccordionTrigger>
          <AccordionContent>
            {flows.filter(flow => flow.type === "primary").map(renderFlowItem)}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="alternative">
          <AccordionTrigger>Alternative Flows</AccordionTrigger>
          <AccordionContent>
            {flows.filter(flow => flow.type === "alternative").map(renderFlowItem)}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="exception">
          <AccordionTrigger>Exception Flows</AccordionTrigger>
          <AccordionContent>
            {flows.filter(flow => flow.type === "exception").map(renderFlowItem)}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

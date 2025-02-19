import { Activity, Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { type Flow } from "../types";
import { toast } from "react-toastify";

interface FlowsSectionProps {
  flows: Flow[];
  onAddClick: () => void;
}

export const FlowsSection = ({ flows, onAddClick }: FlowsSectionProps) => {
  const handleEdit = (flowId: string) => {
    toast({
      title: "Edit Flow",
      description: `Editing flow ${flowId}`
    });
  };

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
            {flows
              .filter(flow => flow.type === "primary")
              .map((flow) => (
                <div key={flow.id} className="mb-2 p-2 border rounded">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{flow.description}</div>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(flow.id)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                  {flow.steps?.map(step => (
                    <div key={step.id} className="ml-4 mt-1">
                      <div className="text-sm">• {step.description}</div>
                      <div className="text-sm text-gray-600 ml-4">
                        Expected: {step.expectedOutcome}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="alternative">
          <AccordionTrigger>Alternative Flows</AccordionTrigger>
          <AccordionContent>
            {flows
              .filter(flow => flow.type === "alternative")
              .map((flow) => (
                <div key={flow.id} className="mb-2 p-2 border rounded">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{flow.description}</div>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(flow.id)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-gray-600 ml-4">
                    Expected: {flow.expectedOutcome}
                  </div>
                </div>
              ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="exception">
          <AccordionTrigger>Exception Flows</AccordionTrigger>
          <AccordionContent>
            {flows
              .filter(flow => flow.type === "exception")
              .map((flow) => (
                <div key={flow.id} className="mb-2 p-2 border rounded">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{flow.description}</div>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(flow.id)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-gray-600 ml-4">
                    Expected: {flow.expectedOutcome}
                  </div>
                </div>
              ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

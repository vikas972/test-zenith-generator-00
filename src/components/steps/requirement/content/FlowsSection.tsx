
import { Activity, Plus, Pencil, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { type Flow } from "../types";
import { toast } from "sonner";

interface FlowsSectionProps {
  flows: Flow[];
  primaryFlows: Flow[];
  alternativeFlows: Flow[];
  exceptionFlows: Flow[];
  onAddFlow: (type: 'primary' | 'alternative' | 'exception', flow: Flow) => void;
  onEditFlow: (type: 'primary' | 'alternative' | 'exception', flowId: string, newDescription: string) => void;
}

export const FlowsSection = ({
  flows,
  primaryFlows,
  alternativeFlows,
  exceptionFlows,
  onAddFlow,
  onEditFlow
}: FlowsSectionProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4" />
          <h3 className="text-sm font-semibold">Functional Flows</h3>
        </div>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="primary">
          <AccordionTrigger className="text-sm font-medium">
            Primary Flows
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pl-4">
              {primaryFlows.map((flow) => (
                <div key={flow.id} className="text-sm flex items-center gap-2">
                  <span className="flex-1">{flow.description}</span>
                  <span className="text-xs text-gray-500">{flow.expectedOutcome}</span>
                </div>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onAddFlow('primary', {
                    id: `f${flows.length + 1}`,
                    description: "New primary flow",
                    expectedOutcome: "Expected outcome",
                    steps: []
                  });
                  toast.success("New primary flow added");
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Flow
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="alternative">
          <AccordionTrigger className="text-sm font-medium">
            Alternative Flows
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pl-4">
              {alternativeFlows.map((flow) => (
                <div key={flow.id} className="text-sm flex items-center gap-2">
                  <span className="flex-1">{flow.description}</span>
                  <span className="text-xs text-gray-500">{flow.expectedOutcome}</span>
                </div>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onAddFlow('alternative', {
                    id: `f${flows.length + 1}`,
                    description: "New alternative flow",
                    expectedOutcome: "Expected outcome",
                    steps: []
                  });
                  toast.success("New alternative flow added");
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Flow
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="exception">
          <AccordionTrigger className="text-sm font-medium">
            Exception Flows
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pl-4">
              {exceptionFlows.map((flow) => (
                <div key={flow.id} className="text-sm flex items-center gap-2">
                  <span className="flex-1">{flow.description}</span>
                  <span className="text-xs text-gray-500">{flow.expectedOutcome}</span>
                </div>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onAddFlow('exception', {
                    id: `f${flows.length + 1}`,
                    description: "New exception flow",
                    expectedOutcome: "Expected outcome",
                    steps: []
                  });
                  toast.success("New exception flow added");
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Flow
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};


import { useState } from "react";
import { CardContent } from "@/components/ui/card";
import { List, Plus, Network, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { type Requirement, type IntegrationPoint, type ExpectedBehavior } from "./types";
import { toast } from "sonner";
import { FlowsSection } from "./sections/FlowsSection";
import { BusinessRulesSection } from "./sections/BusinessRulesSection";
import { AddIntegrationDialog } from "./dialogs/AddIntegrationDialog";
import { AddBehaviorDialog } from "./dialogs/AddBehaviorDialog";

interface RequirementContentProps {
  requirement: Requirement;
}

export const RequirementContent = ({ requirement }: RequirementContentProps) => {
  const [isFlowDialogOpen, setIsFlowDialogOpen] = useState(false);
  const [isBusinessRuleDialogOpen, setIsBusinessRuleDialogOpen] = useState(false);
  const [isDataElementDialogOpen, setIsDataElementDialogOpen] = useState(false);
  const [isIntegrationDialogOpen, setIsIntegrationDialogOpen] = useState(false);
  const [isBehaviorDialogOpen, setIsBehaviorDialogOpen] = useState(false);
  const [newIntegration, setNewIntegration] = useState<{
    system: string;
    type: string;
    expectedBehavior: string;
  }>({
    system: "",
    type: "",
    expectedBehavior: ""
  });
  const [newBehavior, setNewBehavior] = useState<{
    type: "success" | "error" | "system";
    condition: string;
    outcome: string;
  }>({
    type: "success",
    condition: "",
    outcome: ""
  });

  const handleAddIntegration = () => {
    if (!newIntegration.system.trim()) return;
    const newPoint: IntegrationPoint = {
      id: `ip${requirement.integrationPoints?.length + 1 || 1}`,
      ...newIntegration
    };
    requirement.integrationPoints = [...(requirement.integrationPoints || []), newPoint];
    setNewIntegration({ system: "", type: "", expectedBehavior: "" });
    setIsIntegrationDialogOpen(false);
    toast.success("New integration point added");
  };

  const handleAddBehavior = () => {
    if (!newBehavior.condition.trim()) return;
    const newBehaviorItem: ExpectedBehavior = {
      id: `eb${requirement.expectedBehaviors?.length + 1 || 1}`,
      ...newBehavior
    };
    requirement.expectedBehaviors = [...(requirement.expectedBehaviors || []), newBehaviorItem];
    setNewBehavior({ type: "success", condition: "", outcome: "" });
    setIsBehaviorDialogOpen(false);
    toast.success("New expected behavior added");
  };

  return (
    <CardContent>
      <div className="space-y-6">
        <FlowsSection 
          flows={requirement.flows} 
          onAddClick={() => setIsFlowDialogOpen(true)} 
        />

        <BusinessRulesSection 
          rules={requirement.businessRules} 
          onAddClick={() => setIsBusinessRuleDialogOpen(true)} 
        />

        {/* Data Elements Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <List className="h-4 w-4" />
              <h3 className="text-sm font-semibold">Data Elements</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsDataElementDialogOpen(true)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {requirement.dataElements.map((element) => (
              <div key={element.id} className="p-2 border rounded">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{element.name}</span>
                  <span className="text-gray-500">({element.type})</span>
                  {element.required && (
                    <span className="text-xs text-red-500">Required</span>
                  )}
                </div>
                {element.format && (
                  <div className="text-sm text-gray-600 ml-4">
                    Format: {element.format}
                  </div>
                )}
                {element.validationRules && element.validationRules.length > 0 && (
                  <div className="text-sm text-gray-600 ml-4">
                    Validation Rules:
                    <ul className="list-disc ml-4">
                      {element.validationRules.map((rule, index) => (
                        <li key={index}>{rule}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Integration Points Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Network className="h-4 w-4" />
              <h3 className="text-sm font-semibold">Integration Points</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsIntegrationDialogOpen(true)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {requirement.integrationPoints?.map((point) => (
              <div key={point.id} className="p-2 border rounded">
                <div className="font-medium">{point.system}</div>
                <div className="text-sm text-gray-600">
                  Type: {point.type}
                </div>
                <div className="text-sm text-gray-600">
                  Expected Behavior: {point.expectedBehavior}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expected Behaviors Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Box className="h-4 w-4" />
              <h3 className="text-sm font-semibold">Expected Behaviors</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsBehaviorDialogOpen(true)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {["success", "error", "system"].map((type) => (
              <AccordionItem key={type} value={type}>
                <AccordionTrigger className="capitalize">
                  {type === "success" ? "Success Conditions" :
                   type === "error" ? "Error Conditions" : "System Responses"}
                </AccordionTrigger>
                <AccordionContent>
                  {requirement.expectedBehaviors
                    ?.filter(behavior => behavior.type === type)
                    .map((behavior) => (
                      <div key={behavior.id} className="mb-2 p-2 border rounded">
                        <div className="font-medium">Condition: {behavior.condition}</div>
                        <div className="text-sm text-gray-600 ml-4">
                          Expected Outcome: {behavior.outcome}
                        </div>
                      </div>
                    ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <AddIntegrationDialog
          isOpen={isIntegrationDialogOpen}
          onOpenChange={setIsIntegrationDialogOpen}
          newIntegration={newIntegration}
          onIntegrationChange={(key, value) => 
            setNewIntegration(prev => ({ ...prev, [key]: value }))
          }
          onAdd={handleAddIntegration}
        />

        <AddBehaviorDialog
          isOpen={isBehaviorDialogOpen}
          onOpenChange={setIsBehaviorDialogOpen}
          newBehavior={newBehavior}
          onBehaviorChange={(key, value) => 
            setNewBehavior(prev => ({ ...prev, [key]: value as any }))
          }
          onAdd={handleAddBehavior}
        />
      </div>
    </CardContent>
  );
};

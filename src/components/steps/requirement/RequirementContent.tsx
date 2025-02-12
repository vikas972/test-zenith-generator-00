import { useState } from "react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Activity, Shield, List, Plus, Pencil, Save, X, Check, Network, Box } from "lucide-react";
import { type Requirement, type Flow, type BusinessRule, type DataElement, type IntegrationPoint, type ExpectedBehavior } from "./types";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

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
        {/* Functional Flows Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <h3 className="text-sm font-semibold">Functional Flows</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsFlowDialogOpen(true)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="primary">
              <AccordionTrigger>Primary Flows</AccordionTrigger>
              <AccordionContent>
                {requirement.flows
                  .filter(flow => flow.type === "primary")
                  .map((flow) => (
                    <div key={flow.id} className="mb-2 p-2 border rounded">
                      <div className="font-medium">{flow.description}</div>
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
                {requirement.flows
                  .filter(flow => flow.type === "alternative")
                  .map((flow) => (
                    <div key={flow.id} className="mb-2 p-2 border rounded">
                      <div className="font-medium">{flow.description}</div>
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
                {requirement.flows
                  .filter(flow => flow.type === "exception")
                  .map((flow) => (
                    <div key={flow.id} className="mb-2 p-2 border rounded">
                      <div className="font-medium">{flow.description}</div>
                      <div className="text-sm text-gray-600 ml-4">
                        Expected: {flow.expectedOutcome}
                      </div>
                    </div>
                  ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Business Rules Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <h3 className="text-sm font-semibold">Business Rules</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsBusinessRuleDialogOpen(true)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {["authentication", "security", "system"].map((category) => (
              <AccordionItem key={category} value={category}>
                <AccordionTrigger className="capitalize">
                  {category.replace("_", " ")} Rules
                </AccordionTrigger>
                <AccordionContent>
                  {requirement.businessRules
                    .filter(rule => rule.category === category)
                    .map((rule) => (
                      <div key={rule.id} className="mb-2 p-2 border rounded">
                        <div className="font-medium">{rule.description}</div>
                        {rule.validationCriteria && (
                          <div className="text-sm text-gray-600 ml-4">
                            Validation: {rule.validationCriteria}
                          </div>
                        )}
                        {rule.parameters && (
                          <div className="text-sm text-gray-600 ml-4">
                            Parameters: {rule.parameters}
                          </div>
                        )}
                      </div>
                    ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

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

        {/* New Integration Point Dialog */}
        <Dialog open={isIntegrationDialogOpen} onOpenChange={setIsIntegrationDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Integration Point</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input
                placeholder="External System"
                value={newIntegration.system}
                onChange={(e) => setNewIntegration(prev => ({ ...prev, system: e.target.value }))}
              />
              <Input
                placeholder="Integration Type"
                value={newIntegration.type}
                onChange={(e) => setNewIntegration(prev => ({ ...prev, type: e.target.value }))}
              />
              <Input
                placeholder="Expected Behavior"
                value={newIntegration.expectedBehavior}
                onChange={(e) => setNewIntegration(prev => ({ ...prev, expectedBehavior: e.target.value }))}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsIntegrationDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddIntegration}>Add Integration</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* New Expected Behavior Dialog */}
        <Dialog open={isBehaviorDialogOpen} onOpenChange={setIsBehaviorDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Expected Behavior</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <select
                className="w-full border rounded-md p-2"
                value={newBehavior.type}
                onChange={(e) => setNewBehavior(prev => ({ 
                  ...prev, 
                  type: e.target.value as "success" | "error" | "system"
                }))}
              >
                <option value="success">Success Condition</option>
                <option value="error">Error Condition</option>
                <option value="system">System Response</option>
              </select>
              <Input
                placeholder="Condition"
                value={newBehavior.condition}
                onChange={(e) => setNewBehavior(prev => ({ ...prev, condition: e.target.value }))}
              />
              <Input
                placeholder="Expected Outcome"
                value={newBehavior.outcome}
                onChange={(e) => setNewBehavior(prev => ({ ...prev, outcome: e.target.value }))}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsBehaviorDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddBehavior}>Add Behavior</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </CardContent>
  );
};

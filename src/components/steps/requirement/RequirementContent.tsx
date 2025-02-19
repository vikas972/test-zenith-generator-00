
import { useState } from "react";
import { CardContent } from "@/components/ui/card";
import { type Requirement } from "./types";
import { FlowsSection } from "./sections/FlowsSection";
import { BusinessRulesSection } from "./sections/BusinessRulesSection";
import { DataElementsSection } from "./sections/DataElementsSection";
import { AddFlowDialog } from "./dialogs/AddFlowDialog";
import { AddBusinessRuleDialog } from "./dialogs/AddBusinessRuleDialog";
import { AddDataElementDialog } from "./dialogs/AddDataElementDialog";

interface RequirementContentProps {
  requirement: Requirement;
  onUpdateFlows?: (flows: Requirement['flows']) => void;
  onUpdateBusinessRules?: (rules: Requirement['businessRules']) => void;
  onUpdateDataElements?: (elements: Requirement['dataElements']) => void;
}

export const RequirementContent = ({ 
  requirement,
  onUpdateFlows,
  onUpdateBusinessRules,
  onUpdateDataElements
}: RequirementContentProps) => {
  const [isFlowDialogOpen, setIsFlowDialogOpen] = useState(false);
  const [isBusinessRuleDialogOpen, setIsBusinessRuleDialogOpen] = useState(false);
  const [isDataElementDialogOpen, setIsDataElementDialogOpen] = useState(false);
  const [newFlow, setNewFlow] = useState<{ description: string; type: "primary" | "alternative" | "exception" }>({ 
    description: "", 
    type: "primary" 
  });
  const [newBusinessRule, setNewBusinessRule] = useState<{ description: string; category: "authentication" | "security" | "system" | "general" }>({ 
    description: "", 
    category: "general" 
  });
  const [newDataElement, setNewDataElement] = useState({ name: "", type: "", required: false });

  const handleAddFlow = () => {
    setIsFlowDialogOpen(false);
  };

  const handleAddBusinessRule = () => {
    setIsBusinessRuleDialogOpen(false);
  };

  const handleAddDataElement = () => {
    setIsDataElementDialogOpen(false);
  };

  const handleDeleteFlow = (flowId: string) => {
    const updatedFlows = requirement.flows.filter(flow => flow.id !== flowId);
    onUpdateFlows?.(updatedFlows);
  };

  const handleDeleteBusinessRule = (ruleId: string) => {
    const updatedRules = requirement.businessRules.filter(rule => rule.id !== ruleId);
    onUpdateBusinessRules?.(updatedRules);
  };

  const handleDeleteDataElement = (elementId: string) => {
    const updatedElements = requirement.dataElements.filter(element => element.id !== elementId);
    onUpdateDataElements?.(updatedElements);
  };

  return (
    <CardContent>
      <div className="space-y-6">
        <FlowsSection 
          flows={requirement.flows} 
          onAddClick={() => setIsFlowDialogOpen(true)}
          onDelete={handleDeleteFlow}
        />

        <AddFlowDialog
          isOpen={isFlowDialogOpen}
          onOpenChange={setIsFlowDialogOpen}
          onAdd={handleAddFlow}
          flow={newFlow}
          onFlowChange={setNewFlow}
        />

        <BusinessRulesSection 
          rules={requirement.businessRules} 
          onAddClick={() => setIsBusinessRuleDialogOpen(true)}
          onDelete={handleDeleteBusinessRule}
        />

        <AddBusinessRuleDialog
          isOpen={isBusinessRuleDialogOpen}
          onOpenChange={setIsBusinessRuleDialogOpen}
          onAdd={handleAddBusinessRule}
          rule={newBusinessRule}
          onRuleChange={setNewBusinessRule}
        />

        <DataElementsSection
          elements={requirement.dataElements}
          onAddClick={() => setIsDataElementDialogOpen(true)}
          onDelete={handleDeleteDataElement}
        />

        <AddDataElementDialog
          isOpen={isDataElementDialogOpen}
          onOpenChange={setIsDataElementDialogOpen}
          onAdd={handleAddDataElement}
          element={newDataElement}
          onElementChange={setNewDataElement}
        />
      </div>
    </CardContent>
  );
};

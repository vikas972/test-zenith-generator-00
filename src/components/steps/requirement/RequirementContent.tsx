import { useState } from "react";
import { CardContent } from "@/components/ui/card";
import { type Requirement } from "./types";
import { toast } from "sonner";
import { FlowsSection } from "./sections/FlowsSection";
import { BusinessRulesSection } from "./sections/BusinessRulesSection";
import { DataElementsSection } from "./sections/DataElementsSection";
import { AddFlowDialog } from "./dialogs/AddFlowDialog";
import { AddBusinessRuleDialog } from "./dialogs/AddBusinessRuleDialog";
import { AddDataElementDialog } from "./dialogs/AddDataElementDialog";

interface RequirementContentProps {
  requirement: Requirement;
}

export const RequirementContent = ({ requirement }: RequirementContentProps) => {
  const [isFlowDialogOpen, setIsFlowDialogOpen] = useState(false);
  const [isBusinessRuleDialogOpen, setIsBusinessRuleDialogOpen] = useState(false);
  const [isDataElementDialogOpen, setIsDataElementDialogOpen] = useState(false);
  const [newFlow, setNewFlow] = useState({ description: "", type: "primary" });
  const [newBusinessRule, setNewBusinessRule] = useState({ description: "", category: "general" });
  const [newDataElement, setNewDataElement] = useState({ name: "", type: "", required: false });

  const handleAddFlow = () => {
    toast.success("Flow added successfully");
    setIsFlowDialogOpen(false);
  };

  const handleAddBusinessRule = () => {
    toast.success("Business rule added successfully");
    setIsBusinessRuleDialogOpen(false);
  };

  const handleAddDataElement = () => {
    toast.success("Data element added successfully");
    setIsDataElementDialogOpen(false);
  };

  const handleDeleteFlow = (flowId: string) => {
    toast.success("Flow deleted successfully");
  };

  const handleDeleteBusinessRule = (ruleId: string) => {
    toast.success("Business rule deleted successfully");
  };

  const handleDeleteDataElement = (elementId: string) => {
    toast.success("Data element deleted successfully");
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

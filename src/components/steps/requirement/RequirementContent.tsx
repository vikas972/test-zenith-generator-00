
import { useState } from "react";
import { CardContent } from "@/components/ui/card";
import { type Requirement } from "./types";
import { BusinessRequirementsSection } from "./sections/BusinessRequirementsSection";
import { BusinessRulesSection } from "./sections/BusinessRulesSection";
import { DataElementsSection } from "./sections/DataElementsSection";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RequirementContentProps {
  requirement: Requirement;
  onUpdateBusinessRequirements?: (requirements: Requirement['businessRequirements']) => void;
  onUpdateBusinessRules?: (rules: Requirement['businessRules']) => void;
  onUpdateDataElements?: (elements: Requirement['dataElements']) => void;
}

export const RequirementContent = ({ 
  requirement,
  onUpdateBusinessRequirements,
  onUpdateBusinessRules,
  onUpdateDataElements
}: RequirementContentProps) => {
  const [isBusinessReqDialogOpen, setIsBusinessReqDialogOpen] = useState(false);
  const [isBusinessRuleDialogOpen, setIsBusinessRuleDialogOpen] = useState(false);
  const [isDataElementDialogOpen, setIsDataElementDialogOpen] = useState(false);
  const [newBusinessReq, setNewBusinessReq] = useState({ description: "" });
  const [newBusinessRule, setNewBusinessRule] = useState({ 
    description: "", 
    category: "general" as const 
  });
  const [newDataElement, setNewDataElement] = useState({ name: "", type: "", required: false });

  const handleAddBusinessRequirement = () => {
    setIsBusinessReqDialogOpen(false);
  };

  const handleAddBusinessRule = () => {
    setIsBusinessRuleDialogOpen(false);
  };

  const handleAddDataElement = () => {
    setIsDataElementDialogOpen(false);
  };

  const handleDeleteBusinessRequirement = (id: string) => {
    const updated = requirement.businessRequirements.filter(req => req.id !== id);
    onUpdateBusinessRequirements?.(updated);
  };

  const handleDeleteBusinessRule = (ruleId: string) => {
    const updated = requirement.businessRules.filter(rule => rule.id !== ruleId);
    onUpdateBusinessRules?.(updated);
  };

  const handleDeleteDataElement = (elementId: string) => {
    const updated = requirement.dataElements.filter(element => element.id !== elementId);
    onUpdateDataElements?.(updated);
  };

  return (
    <CardContent>
      <div className="space-y-6">
        <BusinessRequirementsSection
          requirements={requirement.businessRequirements}
          onAddClick={() => setIsBusinessReqDialogOpen(true)}
          onDelete={handleDeleteBusinessRequirement}
        />

        <Dialog open={isBusinessReqDialogOpen} onOpenChange={setIsBusinessReqDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Business Requirement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  value={newBusinessReq.description}
                  onChange={(e) => setNewBusinessReq({ description: e.target.value })}
                />
              </div>
              <Button onClick={handleAddBusinessRequirement}>Add Requirement</Button>
            </div>
          </DialogContent>
        </Dialog>

        <BusinessRulesSection 
          rules={requirement.businessRules} 
          onAddClick={() => setIsBusinessRuleDialogOpen(true)}
          onDelete={handleDeleteBusinessRule}
        />

        <DataElementsSection
          elements={requirement.dataElements}
          onAddClick={() => setIsDataElementDialogOpen(true)}
          onDelete={handleDeleteDataElement}
        />
      </div>
    </CardContent>
  );
};

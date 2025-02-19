
import { useState } from "react";
import { CardContent } from "@/components/ui/card";
import { List, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { type Requirement } from "./types";
import { toast } from "sonner";
import { FlowsSection } from "./sections/FlowsSection";
import { BusinessRulesSection } from "./sections/BusinessRulesSection";

interface RequirementContentProps {
  requirement: Requirement;
}

export const RequirementContent = ({ requirement }: RequirementContentProps) => {
  const [isFlowDialogOpen, setIsFlowDialogOpen] = useState(false);
  const [isBusinessRuleDialogOpen, setIsBusinessRuleDialogOpen] = useState(false);
  const [isDataElementDialogOpen, setIsDataElementDialogOpen] = useState(false);

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
      </div>
    </CardContent>
  );
};

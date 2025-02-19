
import { Shield, Plus, Pencil, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { type BusinessRule } from "../types";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface BusinessRulesSectionProps {
  rules: BusinessRule[];
  onAddClick: () => void;
}

export const BusinessRulesSection = ({ rules, onAddClick }: BusinessRulesSectionProps) => {
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);
  const [editedDescription, setEditedDescription] = useState("");

  const handleEditStart = (rule: BusinessRule) => {
    setEditingRuleId(rule.id);
    setEditedDescription(rule.description);
  };

  const handleSave = (ruleId: string) => {
    setEditingRuleId(null);
    // Here you would typically update the rule in the parent component
  };

  const handleCancel = () => {
    setEditingRuleId(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <h3 className="text-sm font-semibold">Business Rules</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onAddClick}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {["authentication", "security", "system", "general"].map((category) => (
          <AccordionItem key={category} value={category}>
            <AccordionTrigger className="capitalize">
              {category.replace("_", " ")} Rules
            </AccordionTrigger>
            <AccordionContent>
              {rules
                .filter(rule => rule.category === category)
                .map((rule) => (
                  <div key={rule.id} className="mb-2 p-2 border rounded">
                    <div className="flex items-center justify-between">
                      {editingRuleId === rule.id ? (
                        <div className="flex-1 flex items-center gap-2">
                          <Input
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                            className="flex-1"
                          />
                          <Button variant="ghost" size="sm" onClick={() => handleSave(rule.id)}>
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={handleCancel}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <div className="font-medium">{rule.description}</div>
                          <Button variant="ghost" size="sm" onClick={() => handleEditStart(rule)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                    {!editingRuleId && (
                      <>
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
                      </>
                    )}
                  </div>
                ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};


import { Shield, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { type BusinessRule } from "../types";

interface BusinessRulesSectionProps {
  rules: BusinessRule[];
  onAddClick: () => void;
}

export const BusinessRulesSection = ({ rules, onAddClick }: BusinessRulesSectionProps) => {
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
        {["authentication", "security", "system"].map((category) => (
          <AccordionItem key={category} value={category}>
            <AccordionTrigger className="capitalize">
              {category.replace("_", " ")} Rules
            </AccordionTrigger>
            <AccordionContent>
              {rules
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
  );
};

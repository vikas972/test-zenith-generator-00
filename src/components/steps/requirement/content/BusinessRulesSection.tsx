
import { Shield, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { type BusinessRule } from "../types";
import { toast } from "sonner";

interface BusinessRulesSectionProps {
  rules: BusinessRule[];
  onAddRule: (category: string) => void;
}

export const BusinessRulesSection = ({ rules, onAddRule }: BusinessRulesSectionProps) => {
  const categories = [
    "Authentication Rules",
    "Security Controls",
    "System Constraints"
  ];

  const getRulesByCategory = (category: string) => 
    rules.filter(rule => rule.category === category);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <h3 className="text-sm font-semibold">Business Rules</h3>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {categories.map(category => (
          <AccordionItem key={category} value={category}>
            <AccordionTrigger className="text-sm font-medium">
              {category}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pl-4">
                {getRulesByCategory(category).map((rule) => (
                  <div key={rule.id} className="text-sm space-y-1">
                    <div className="font-medium">{rule.description}</div>
                    {rule.validationCriteria && (
                      <div className="text-xs text-gray-600">
                        Validation: {rule.validationCriteria}
                      </div>
                    )}
                    {rule.parameters && rule.parameters.length > 0 && (
                      <div className="text-xs text-gray-600">
                        Parameters: {rule.parameters.map(p => `${p.name}=${p.value}`).join(', ')}
                      </div>
                    )}
                    {rule.dependencies && rule.dependencies.length > 0 && (
                      <div className="text-xs text-gray-600">
                        Dependencies: {rule.dependencies.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onAddRule(category);
                    toast.success(`New ${category.toLowerCase()} rule added`);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Rule
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

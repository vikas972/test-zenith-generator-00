
import { useState } from "react";
import { Shield, Plus, Pencil, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type BusinessRule } from "../types";
import { toast } from "sonner";

interface BusinessRulesSectionProps {
  rules: BusinessRule[];
  onAddRule: (rule: BusinessRule) => void;
  onUpdateRule: (ruleId: string, updatedRule: BusinessRule) => void;
}

export const BusinessRulesSection = ({ rules, onAddRule, onUpdateRule }: BusinessRulesSectionProps) => {
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");

  const rulesByCategory = rules.reduce((acc, rule) => {
    const category = rule.category || "other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(rule);
    return acc;
  }, {} as Record<string, BusinessRule[]>);

  const renderRuleDetails = (rule: BusinessRule) => (
    <div className="ml-4 mt-1 space-y-1 text-sm text-gray-600">
      {rule.validationCriteria && (
        <div>Validation: {rule.validationCriteria}</div>
      )}
      {rule.parameters && (
        <div>Parameters: {rule.parameters}</div>
      )}
      {rule.dependencies?.length > 0 && (
        <div>Dependencies: {rule.dependencies.join(", ")}</div>
      )}
    </div>
  );

  const renderCategorySection = (category: string, rules: BusinessRule[]) => {
    const title = category.split("_").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");

    return (
      <div key={category} className="space-y-2">
        <h4 className="text-sm font-semibold text-gray-700">{title}</h4>
        {rules.map((rule) => (
          <div key={rule.id} className="pl-4 py-2 border-l-2 border-gray-200">
            <div className="flex items-center justify-between group">
              <span className="text-sm">{rule.description}</span>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100"
                onClick={() => {
                  setEditingItemId(rule.id);
                  setEditingValue(rule.description);
                }}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
            {renderRuleDetails(rule)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <h3 className="text-sm font-semibold">Business Rules</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => {
            const newRule: BusinessRule = {
              id: `br${rules.length + 1}`,
              description: "New business rule",
              category: "other"
            };
            onAddRule(newRule);
            toast.success("New business rule added");
          }}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-4">
        {renderCategorySection("authentication", rulesByCategory.authentication || [])}
        {renderCategorySection("security", rulesByCategory.security || [])}
        {renderCategorySection("system", rulesByCategory.system || [])}
        {renderCategorySection("other", rulesByCategory.other || [])}
      </div>
    </div>
  );
};

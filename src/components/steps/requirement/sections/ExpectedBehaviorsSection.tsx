
import { useState } from "react";
import { CheckCircle, Plus, Pencil, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type ExpectedBehavior } from "../types";
import { toast } from "sonner";

interface ExpectedBehaviorsSectionProps {
  behaviors: ExpectedBehavior[];
  onAddBehavior: (behavior: ExpectedBehavior) => void;
  onUpdateBehavior: (behaviorId: string, updatedBehavior: ExpectedBehavior) => void;
}

export const ExpectedBehaviorsSection = ({ 
  behaviors, 
  onAddBehavior, 
  onUpdateBehavior 
}: ExpectedBehaviorsSectionProps) => {
  const [editingBehavior, setEditingBehavior] = useState<ExpectedBehavior | null>(null);
  const [editValue, setEditValue] = useState({ condition: "", response: "" });

  const behaviorsByType = behaviors.reduce((acc, behavior) => {
    if (!acc[behavior.type]) acc[behavior.type] = [];
    acc[behavior.type].push(behavior);
    return acc;
  }, {} as Record<string, ExpectedBehavior[]>);

  const handleEdit = (behavior: ExpectedBehavior) => {
    setEditingBehavior(behavior);
    setEditValue({
      condition: behavior.condition,
      response: behavior.response
    });
  };

  const handleSave = () => {
    if (editingBehavior && editValue.condition.trim() && editValue.response.trim()) {
      onUpdateBehavior(editingBehavior.id, {
        ...editingBehavior,
        condition: editValue.condition.trim(),
        response: editValue.response.trim()
      });
      setEditingBehavior(null);
      setEditValue({ condition: "", response: "" });
      toast.success("Behavior updated successfully");
    }
  };

  const handleAddToSection = (type: "success" | "error" | "system") => {
    const newBehavior: ExpectedBehavior = {
      id: `eb${Date.now()}`,
      type,
      condition: `New ${type} condition`,
      response: `Expected ${type} response`
    };
    onAddBehavior(newBehavior);
    toast.success(`New ${type} behavior added`);
  };

  const renderBehaviorSection = (type: "success" | "error" | "system") => {
    const title = type.charAt(0).toUpperCase() + type.slice(1);
    const behaviors = behaviorsByType[type] || [];
    
    return (
      <div key={type} className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-gray-700">{title} Conditions</h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleAddToSection(type)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {behaviors.map((behavior) => (
          <div key={behavior.id} className="pl-4 py-2 border-l-2 border-gray-200">
            <div className="flex items-center justify-between group">
              {editingBehavior?.id === behavior.id ? (
                <div className="flex flex-col gap-2 w-full">
                  <Input
                    placeholder="Condition"
                    value={editValue.condition}
                    onChange={(e) => setEditValue({ ...editValue, condition: e.target.value })}
                  />
                  <Input
                    placeholder="Response"
                    value={editValue.response}
                    onChange={(e) => setEditValue({ ...editValue, response: e.target.value })}
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={handleSave}>
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setEditingBehavior(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <div className="text-sm font-medium">When: {behavior.condition}</div>
                    <div className="text-sm text-gray-600">Response: {behavior.response}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100"
                    onClick={() => handleEdit(behavior)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
        {behaviors.length === 0 && (
          <div className="text-sm text-gray-500 italic pl-4">
            No {type} conditions defined
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle className="h-4 w-4" />
        <h3 className="text-sm font-semibold">Expected Behaviors</h3>
      </div>
      <div className="space-y-6">
        {renderBehaviorSection("success")}
        {renderBehaviorSection("error")}
        {renderBehaviorSection("system")}
      </div>
    </div>
  );
};

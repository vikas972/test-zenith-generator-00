
import { useState } from "react";
import { CheckCircle, Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const behaviorsByType = behaviors.reduce((acc, behavior) => {
    if (!acc[behavior.type]) acc[behavior.type] = [];
    acc[behavior.type].push(behavior);
    return acc;
  }, {} as Record<string, ExpectedBehavior[]>);

  const renderBehaviorSection = (type: string, behaviors: ExpectedBehavior[]) => {
    const title = type.charAt(0).toUpperCase() + type.slice(1);
    
    return (
      <div key={type} className="space-y-2">
        <h4 className="text-sm font-semibold text-gray-700">{title} Conditions</h4>
        {behaviors.map((behavior) => (
          <div key={behavior.id} className="pl-4 py-2 border-l-2 border-gray-200">
            <div className="flex items-center justify-between group">
              <div>
                <div className="text-sm font-medium">When: {behavior.condition}</div>
                <div className="text-sm text-gray-600">Response: {behavior.response}</div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100"
                onClick={() => setEditingItemId(behavior.id)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <h3 className="text-sm font-semibold">Expected Behaviors</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => {
            const newBehavior: ExpectedBehavior = {
              id: `eb${behaviors.length + 1}`,
              type: "success",
              condition: "New condition",
              response: "Expected response"
            };
            onAddBehavior(newBehavior);
            toast.success("New expected behavior added");
          }}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-4">
        {renderBehaviorSection("success", behaviorsByType.success || [])}
        {renderBehaviorSection("error", behaviorsByType.error || [])}
        {renderBehaviorSection("system", behaviorsByType.system || [])}
      </div>
    </div>
  );
};


import { CheckCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type ExpectedBehavior } from "../types";
import { toast } from "sonner";

interface ExpectedBehaviorsSectionProps {
  behaviors: ExpectedBehavior[];
  onAddBehavior: () => void;
}

export const ExpectedBehaviorsSection = ({
  behaviors,
  onAddBehavior
}: ExpectedBehaviorsSectionProps) => {
  const successBehaviors = behaviors.filter(b => b.type === 'success');
  const errorBehaviors = behaviors.filter(b => b.type === 'error');

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <h3 className="text-sm font-semibold">Expected Behaviors</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={() => {
          onAddBehavior();
          toast.success("New expected behavior added");
        }}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Success Conditions</h4>
          <div className="space-y-2">
            {successBehaviors.map((behavior) => (
              <div key={behavior.id} className="text-sm border rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">Condition:</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">Success</Badge>
                </div>
                <div className="text-gray-600 mb-2">{behavior.condition}</div>
                <div className="text-xs">
                  <span className="font-medium">System Response:</span>
                  <span className="text-gray-600 ml-1">{behavior.response}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Error Conditions</h4>
          <div className="space-y-2">
            {errorBehaviors.map((behavior) => (
              <div key={behavior.id} className="text-sm border rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">Condition:</span>
                  <Badge variant="destructive">Error</Badge>
                </div>
                <div className="text-gray-600 mb-2">{behavior.condition}</div>
                <div className="text-xs">
                  <span className="font-medium">System Response:</span>
                  <span className="text-gray-600 ml-1">{behavior.response}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

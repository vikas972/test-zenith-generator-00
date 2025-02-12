
import { Network, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type IntegrationPoint } from "../types";
import { toast } from "sonner";

interface IntegrationPointsSectionProps {
  integrationPoints: IntegrationPoint[];
  onAddIntegrationPoint: () => void;
}

export const IntegrationPointsSection = ({
  integrationPoints,
  onAddIntegrationPoint
}: IntegrationPointsSectionProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Network className="h-4 w-4" />
          <h3 className="text-sm font-semibold">Integration Points</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={() => {
          onAddIntegrationPoint();
          toast.success("New integration point added");
        }}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {integrationPoints.map((point) => (
          <div key={point.id} className="text-sm space-y-2 border rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">{point.system}</span>
              <Badge variant="outline">{point.type}</Badge>
            </div>
            <div className="text-gray-600">{point.description}</div>
            <div className="text-xs text-gray-500">
              Expected Behavior: {point.expectedBehavior}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

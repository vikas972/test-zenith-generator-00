
import { useState } from "react";
import { Network, Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type IntegrationPoint } from "../types";
import { toast } from "sonner";

interface IntegrationPointsSectionProps {
  integrationPoints: IntegrationPoint[];
  onAddIntegrationPoint: (point: IntegrationPoint) => void;
  onUpdateIntegrationPoint: (pointId: string, updatedPoint: IntegrationPoint) => void;
}

export const IntegrationPointsSection = ({ 
  integrationPoints, 
  onAddIntegrationPoint, 
  onUpdateIntegrationPoint 
}: IntegrationPointsSectionProps) => {
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Network className="h-4 w-4" />
          <h3 className="text-sm font-semibold">Integration Points</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => {
            const newPoint: IntegrationPoint = {
              id: `ip${integrationPoints.length + 1}`,
              system: "New System",
              type: "API",
              expectedBehavior: "Define expected behavior"
            };
            onAddIntegrationPoint(newPoint);
            toast.success("New integration point added");
          }}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-4">
        {integrationPoints.map((point) => (
          <div key={point.id} className="group border rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium">{point.system}</span>
                <span className="text-sm text-gray-500">({point.type})</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100"
                onClick={() => setEditingItemId(point.id)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Expected Behavior: {point.expectedBehavior}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getRequirementDetails } from "../requirementUtils";

interface RequirementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedRequirement: string | null;
}

export const RequirementDialog = ({
  open,
  onOpenChange,
  selectedRequirement,
}: RequirementDialogProps) => {
  if (!selectedRequirement) return null;
  
  const requirement = getRequirementDetails(selectedRequirement);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Requirement Details</DialogTitle>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">
                {selectedRequirement}
              </h3>
              <div className="text-sm text-muted-foreground">
                Confidence: {Math.round(requirement.confidence * 100)}%
              </div>
            </div>

            <div className="space-y-6">
              {/* Functional Area */}
              <div>
                <h4 className="font-medium mb-2">Functional Area</h4>
                <p className="text-sm text-gray-600">
                  {requirement.functionalArea}
                </p>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-gray-600">
                  {requirement.description}
                </p>
              </div>

              {/* Actors */}
              <div>
                <h4 className="font-medium mb-2">Actors</h4>
                <div className="flex gap-2">
                  {requirement.actors.map((actor, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 rounded text-sm">
                      {actor}
                    </span>
                  ))}
                </div>
              </div>

              {/* Business Requirements */}
              <div>
                <h4 className="font-medium mb-2">Business Requirements</h4>
                <ul className="space-y-2">
                  {requirement.businessRequirements.map((req) => (
                    <li key={req.id} className="text-sm text-gray-600">
                      {req.description}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Business Rules */}
              <div>
                <h4 className="font-medium mb-2">Business Rules</h4>
                <ul className="space-y-2">
                  {requirement.businessRules.map((rule) => (
                    <li key={rule.id} className="text-sm">
                      <span className="text-gray-600">{rule.description}</span>
                      <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded text-xs">
                        {rule.category}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Data Elements */}
              <div>
                <h4 className="font-medium mb-2">Data Elements</h4>
                <div className="space-y-3">
                  {requirement.dataElements.map((element) => (
                    <div key={element.id} className="p-3 border rounded">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{element.name}</span>
                        <span className="text-sm text-gray-500">{element.type}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {element.specifications.map((spec, index) => (
                          <div key={index}>{spec}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

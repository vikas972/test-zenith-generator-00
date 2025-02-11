
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Shield, List, AlertCircle, Plus } from "lucide-react";
import { type Requirement } from "./types";

interface RequirementContentProps {
  requirement: Requirement;
}

export const RequirementContent = ({ requirement }: RequirementContentProps) => {
  return (
    <CardContent>
      <div className="space-y-6">
        {/* Functional Flows */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <h3 className="text-sm font-semibold">Functional Flows</h3>
            </div>
            <Button variant="ghost" size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {requirement.flows.map((flow) => (
              <div key={flow.id} className="text-sm">
                {flow.description}
              </div>
            ))}
          </div>
        </div>

        {/* Business Rules */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <h3 className="text-sm font-semibold">Business Rules</h3>
            </div>
            <Button variant="ghost" size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {requirement.businessRules.map((rule) => (
              <div key={rule.id} className="text-sm">
                {rule.description}
              </div>
            ))}
          </div>
        </div>

        {/* Data Elements */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <List className="h-4 w-4" />
              <h3 className="text-sm font-semibold">Data Elements</h3>
            </div>
            <Button variant="ghost" size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {requirement.dataElements.map((element) => (
              <div key={element.id} className="text-sm flex items-center gap-2">
                <span className="font-medium">{element.name}</span>
                <span className="text-gray-500">({element.type})</span>
                {element.required && (
                  <span className="text-xs text-red-500">Required</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Missing Information */}
        {requirement.missingInfo.length > 0 && (
          <div className="mt-4 p-4 bg-yellow-50 rounded-md">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800">Missing Information</h4>
                <ul className="mt-2 text-sm text-yellow-700 list-disc pl-5">
                  {requirement.missingInfo.map((info, index) => (
                    <li key={index}>{info}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </CardContent>
  );
};

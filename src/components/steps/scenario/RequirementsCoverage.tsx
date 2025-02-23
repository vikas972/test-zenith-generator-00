
import { cn } from "@/lib/utils";
import { type TestScenario } from "./types";
import { AlertCircle, CheckCircle, PieChart } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface RequirementsCoverageProps {
  scenarios: TestScenario[];
  selectedScenario: string | null;
  onRequirementClick: (id: string) => void;
}

interface MissingCoverage {
  type: string;
  description: string;
}

export const RequirementsCoverage = ({
  scenarios,
  selectedScenario,
  onRequirementClick,
}: RequirementsCoverageProps) => {
  const calculateCoverage = (relatedScenarios: TestScenario[]) => {
    const totalFlows = relatedScenarios.reduce((acc, scenario) => acc + scenario.flows.length, 0);
    const totalSubflows = relatedScenarios.reduce((acc, scenario) => 
      acc + scenario.flows.reduce((flowAcc, flow) => flowAcc + flow.subflows.length, 0), 0);
    
    const coverage = Math.min(100, Math.round((totalFlows * 20 + totalSubflows * 10) / 3));
    return coverage;
  };

  const getMissingCoverageItems = (coverage: number): MissingCoverage[] => {
    if (coverage === 100) return [];
    
    const missingItems: MissingCoverage[] = [];
    if (coverage < 100) {
      missingItems.push({
        type: "flow",
        description: "Add error handling flows for invalid inputs"
      });
    }
    if (coverage < 80) {
      missingItems.push({
        type: "validation",
        description: "Add validation scenarios for boundary conditions"
      });
    }
    if (coverage < 60) {
      missingItems.push({
        type: "edge_case",
        description: "Consider edge cases for concurrent user actions"
      });
    }
    return missingItems;
  };

  return (
    <div className="h-full p-4">
      <div className="prose prose-sm max-w-none">
        <div className="space-y-4">
          {Object.entries(
            scenarios.reduce((acc: { [key: string]: TestScenario[] }, scenario) => {
              if (!acc[scenario.requirementId]) {
                acc[scenario.requirementId] = [];
              }
              acc[scenario.requirementId].push(scenario);
              return acc;
            }, {})
          ).map(([requirementId, relatedScenarios]) => {
            const coverage = calculateCoverage(relatedScenarios);
            const missingItems = getMissingCoverageItems(coverage);
            
            return (
              <div
                key={requirementId}
                className={cn(
                  "p-3 border rounded transition-colors cursor-pointer w-full",
                  selectedScenario && relatedScenarios.some(s => s.id === selectedScenario)
                    ? "bg-primary/10 border-primary" 
                    : "hover:bg-gray-50"
                )}
                onClick={() => onRequirementClick(requirementId)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{requirementId}</div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="flex items-center gap-2">
                          <PieChart className={cn(
                            "h-4 w-4",
                            coverage === 100 ? "text-green-500" : "text-amber-500"
                          )} />
                          <span className="text-sm font-semibold text-gray-700">{coverage}%</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Requirement Coverage</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="text-sm text-gray-600">
                  <div className="flex justify-between items-center mb-1">
                    <span>Scenarios:</span>
                    <span className="font-medium">{relatedScenarios.length}</span>
                  </div>
                  <div>
                    Flow Coverage:
                    <ul className="mt-1 ml-4 list-disc text-xs">
                      {Object.entries(
                        relatedScenarios.flatMap(s => s.flows)
                          .reduce((acc: { [key: string]: number }, flow) => {
                            acc[flow.type] = (acc[flow.type] || 0) + flow.subflows.length;
                            return acc;
                          }, {})
                      ).map(([type, count]) => (
                        <li key={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)} Flows: {count}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {missingItems.length > 0 && (
                    <div className="mt-2 p-2 bg-amber-50 rounded border border-amber-200">
                      <div className="flex items-center gap-1 text-amber-600 mb-1">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-xs font-medium">Missing Coverage</span>
                      </div>
                      <ul className="space-y-1">
                        {missingItems.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-xs text-amber-700">
                            <span>•</span>
                            <span>{item.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

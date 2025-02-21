
import { cn } from "@/lib/utils";
import { type TestScenario } from "./types";
import { Percent } from "lucide-react";

interface RequirementsCoverageProps {
  scenarios: TestScenario[];
  selectedScenario: string | null;
  onRequirementClick: (id: string) => void;
}

export const RequirementsCoverage = ({
  scenarios,
  selectedScenario,
  onRequirementClick,
}: RequirementsCoverageProps) => {
  const calculateCoverage = (relatedScenarios: TestScenario[]) => {
    // This is a simple calculation - you can adjust the weights based on your needs
    const totalFlows = relatedScenarios.reduce((acc, scenario) => acc + scenario.flows.length, 0);
    const totalSubflows = relatedScenarios.reduce((acc, scenario) => 
      acc + scenario.flows.reduce((flowAcc, flow) => flowAcc + flow.subflows.length, 0), 0);
    
    // Calculate coverage based on number of flows and subflows
    const coverage = Math.min(100, Math.round((totalFlows * 20 + totalSubflows * 10) / 3));
    return coverage;
  };

  return (
    <div className="w-1/3 border-l p-4">
      <div className="prose prose-sm">
        <h3 className="text-lg font-semibold mb-4">Requirements Coverage</h3>
        <div className="space-y-2">
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
            
            return (
              <div
                key={requirementId}
                className={cn(
                  "p-3 border rounded transition-colors cursor-pointer",
                  selectedScenario && relatedScenarios.some(s => s.id === selectedScenario)
                    ? "bg-primary/10 border-primary" 
                    : "hover:bg-gray-50"
                )}
                onClick={() => onRequirementClick(requirementId)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{requirementId}</div>
                  <div className="flex items-center gap-2">
                    <Percent className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-semibold text-gray-700">{coverage}%</span>
                  </div>
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

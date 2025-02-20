
import { cn } from "@/lib/utils";
import { type TestScenario } from "./types";

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
          ).map(([requirementId, relatedScenarios]) => (
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
              <div className="flex items-center justify-between">
                <div className="font-medium">{requirementId}</div>
                <div className="text-sm text-gray-500">{relatedScenarios.length} Scenarios</div>
              </div>
              <div className="text-sm text-gray-600 mt-1">
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
          ))}
        </div>
      </div>
    </div>
  );
};

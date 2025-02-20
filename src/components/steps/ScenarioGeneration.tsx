
import { useState } from "react";
import { type Requirement } from "./requirement/types";
import { useToast } from "@/components/ui/use-toast";
import { RequirementsList } from "./requirement/components/RequirementsList";
import { useRequirements } from "./requirement/hooks/useRequirements";
import { RequirementsSection } from "./requirement/components/RequirementsSection";
import { useRequirementsLayout } from "./requirement/hooks/useRequirementsLayout";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ScenarioGenerationProps {
  selectedFile: { id: string; name: string; uploadTime: Date } | null;
}

interface TestScenario {
  id: string;
  title: string;
  priority: "High" | "Medium" | "Low";
  requirementIds: string[];
  conditions: {
    id: string;
    title: string;
    requirementRef: string;
    variations: {
      id: string;
      description: string;
      requirementRef: string;
    }[];
  }[];
}

const initialScenarios: TestScenario[] = [
  {
    id: "TS-001",
    title: "User Authentication Scenarios",
    priority: "High",
    requirementIds: ["REQ-001", "REQ-002", "REQ-003"],
    conditions: [
      {
        id: "COND-001",
        title: "Standard Login",
        requirementRef: "REQ-001.1",
        variations: [
          {
            id: "VAR-001",
            description: "Valid credentials login",
            requirementRef: "REQ-001.1"
          },
          {
            id: "VAR-002",
            description: "Remember me functionality",
            requirementRef: "REQ-001.3"
          }
        ]
      },
      {
        id: "COND-002",
        title: "Failed Login Attempts",
        requirementRef: "REQ-001.2",
        variations: [
          {
            id: "VAR-003",
            description: "Invalid username/password",
            requirementRef: "REQ-001.2"
          },
          {
            id: "VAR-004",
            description: "Account lockout after 3 attempts",
            requirementRef: "REQ-002.2"
          }
        ]
      }
    ]
  }
];

export const ScenarioGeneration = ({ selectedFile }: ScenarioGenerationProps) => {
  const { toast } = useToast();
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);
  const [scenarios, setScenarios] = useState<TestScenario[]>(initialScenarios);

  const {
    isRequirementsMaximized,
    isSourceMaximized,
    toggleRequirementsMaximize,
    toggleSourceMaximize,
  } = useRequirementsLayout();

  const handleScenarioClick = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (scenario) {
      setSelectedRequirements(scenario.requirementIds);
    }
  };

  const handleRequirementClick = (requirementId: string) => {
    // Future implementation for requirement click handling
  };

  return (
    <div className="flex gap-4 h-full">
      {/* Left Panel - Test Scenarios */}
      <div className={cn(
        "flex flex-col transition-all duration-300",
        isRequirementsMaximized ? "w-full" : "w-2/3"
      )}>
        {scenarios.map((scenario) => (
          <Card
            key={scenario.id}
            className={cn(
              "mb-4 p-4",
              selectedScenario === scenario.id && "border-primary"
            )}
            onClick={() => handleScenarioClick(scenario.id)}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{scenario.title}</h3>
                <div className="text-sm text-gray-500">ID: {scenario.id}</div>
                <div className="text-sm text-gray-500">
                  Priority: <span className="font-medium">{scenario.priority}</span>
                </div>
                <div className="flex gap-2 mt-2">
                  {scenario.requirementIds.map((reqId) => (
                    <button
                      key={reqId}
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded hover:bg-primary/20"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRequirementClick(reqId);
                      }}
                    >
                      {reqId}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {scenario.conditions.map((condition) => (
              <div key={condition.id} className="ml-4 mb-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  {condition.title}
                  <span className="text-xs text-gray-500">[{condition.requirementRef}]</span>
                </h4>
                <div className="space-y-2">
                  {condition.variations.map((variation) => (
                    <div
                      key={variation.id}
                      className="ml-4 flex items-start gap-2 text-sm"
                    >
                      <span className="text-gray-400">-</span>
                      <div>
                        <span>{variation.description}</span>
                        <span className="text-xs text-gray-500 ml-2">
                          [{variation.requirementRef}]
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Card>
        ))}
      </div>

      {/* Right Panel - Requirements Coverage */}
      <div className={cn(
        "border-l p-4 transition-all duration-300",
        isRequirementsMaximized ? "hidden" : "w-1/3"
      )}>
        <div className="prose prose-sm">
          <h3 className="text-lg font-semibold mb-4">Requirements Coverage</h3>
          <div className="space-y-2">
            {selectedRequirements.map((reqId) => (
              <div
                key={reqId}
                className="p-2 border rounded bg-primary/5 border-primary"
              >
                <div className="font-medium">{reqId}</div>
                <div className="text-sm text-gray-600">
                  User Authentication Requirement
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

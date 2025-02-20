import { useState } from "react";
import { type Requirement } from "./requirement/types";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Plus, Edit2, Trash2 } from "lucide-react";
import { type TestScenario, type TestScenarioFlow, type FlowType } from "./scenario/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ScenarioGenerationProps {
  selectedFile: { id: string; name: string; uploadTime: Date } | null;
}

const initialScenarios: TestScenario[] = [
  {
    id: "TS-001",
    title: "User Authentication",
    requirementId: "REQ-001",
    priority: "high",
    flows: [
      {
        type: "primary",
        description: "Standard login authentication",
        subflows: [
          {
            name: "Main Flow",
            coverage: "Valid credentials authentication, Successful login process, Dashboard access verification",
            expectedResults: "User successfully logs in"
          }
        ]
      },
      {
        type: "alternate",
        description: "Valid business variations",
        subflows: [
          {
            name: "Remember Me Option",
            coverage: "Persistent login functionality",
            expectedResults: "Session persists"
          },
          {
            name: "Password Change",
            coverage: "Password update process",
            expectedResults: "Password successfully changed"
          }
        ]
      },
      {
        type: "negative",
        description: "Business error conditions",
        subflows: [
          {
            name: "Invalid Login",
            coverage: "Wrong credentials handling",
            expectedResults: "Access denied"
          },
          {
            name: "Account Lockout",
            coverage: "Multiple failed attempts",
            expectedResults: "Account locked"
          }
        ]
      },
      {
        type: "exception",
        description: "System/technical errors",
        subflows: [
          {
            name: "System Unavailable",
            coverage: "Database connection failure",
            expectedResults: "System error message"
          },
          {
            name: "Network Issues",
            coverage: "Connection timeout",
            expectedResults: "Network error message"
          }
        ]
      }
    ]
  },
  {
    id: "TS-002",
    title: "Password Reset",
    requirementId: "REQ-002",
    priority: "high",
    flows: [
      {
        type: "primary",
        description: "Standard password reset flow",
        subflows: [
          {
            name: "Main Flow",
            coverage: "Password reset request, Email verification, New password setup",
            expectedResults: "Password successfully reset"
          }
        ]
      },
      {
        type: "alternate",
        description: "Alternative reset methods",
        subflows: [
          {
            name: "Security Questions",
            coverage: "Security question verification",
            expectedResults: "Access granted via security questions"
          }
        ]
      },
      {
        type: "negative",
        description: "Invalid reset attempts",
        subflows: [
          {
            name: "Invalid Token",
            coverage: "Expired/invalid reset token handling",
            expectedResults: "Reset denied with proper message"
          }
        ]
      }
    ]
  }
];

const getFlowTypeIcon = (type: FlowType) => {
  switch (type) {
    case "primary":
      return "→";
    case "alternate":
      return "⤷";
    case "negative":
      return "⚠";
    case "exception":
      return "⚡";
    default:
      return "•";
  }
};

export const ScenarioGeneration = ({ selectedFile }: ScenarioGenerationProps) => {
  const { toast } = useToast();
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [expandedScenarios, setExpandedScenarios] = useState<string[]>([]);
  const [scenarios, setScenarios] = useState<TestScenario[]>(initialScenarios);
  const [showRequirementDialog, setShowRequirementDialog] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState<string | null>(null);

  const handleScenarioClick = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    setExpandedScenarios(prev => 
      prev.includes(scenarioId) 
        ? prev.filter(id => id !== scenarioId)
        : [...prev, scenarioId]
    );
  };

  const handleRequirementClick = (requirementId: string) => {
    setSelectedRequirement(requirementId);
    setShowRequirementDialog(true);
  };

  const handleAddScenario = () => {
    toast({
      title: "Success",
      description: "New scenario added"
    });
  };

  const handleEditScenario = (e: React.MouseEvent, scenarioId: string) => {
    e.stopPropagation();
    toast({
      title: "Success",
      description: "Edit scenario"
    });
  };

  const handleDeleteScenario = (e: React.MouseEvent, scenarioId: string) => {
    e.stopPropagation();
    toast({
      title: "Success",
      description: "Delete scenario"
    });
  };

  return (
    <div className="flex gap-4 h-full">
      <div className="w-2/3 flex flex-col">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Test Scenarios</h2>
          <Button onClick={handleAddScenario}>
            <Plus className="h-4 w-4 mr-2" />
            Add Scenario
          </Button>
        </div>

        <div className="space-y-4">
          {scenarios.map((scenario) => (
            <Card
              key={scenario.id}
              className={cn(
                "cursor-pointer transition-colors",
                selectedScenario === scenario.id && "border-primary"
              )}
              onClick={() => handleScenarioClick(scenario.id)}
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {expandedScenarios.includes(scenario.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                    <div>
                      <div className="font-medium">
                        📋 {scenario.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {scenario.id} | Priority: {scenario.priority} | Requirement:{" "}
                        <button 
                          className="text-primary hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRequirementClick(scenario.requirementId);
                          }}
                        >
                          {scenario.requirementId}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleEditScenario(e, scenario.id)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleDeleteScenario(e, scenario.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>

                {expandedScenarios.includes(scenario.id) && (
                  <div className="mt-4 space-y-4">
                    {scenario.flows.map((flow, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="font-medium">
                          {index + 1}. {flow.type.charAt(0).toUpperCase() + flow.type.slice(1)} Flow
                        </h4>
                        <div className="text-sm text-gray-600 ml-4">
                          Description: {flow.description}
                        </div>
                        <div className="space-y-2 ml-6">
                          {flow.subflows.map((subflow, subIndex) => (
                            <div key={subIndex} className="text-sm">
                              <div className="flex items-start gap-2">
                                <span className="text-gray-400">{getFlowTypeIcon(flow.type)}</span>
                                <div className="space-y-1">
                                  <div className="font-medium">{subflow.name}</div>
                                  <div className="text-gray-600">Coverage: {subflow.coverage}</div>
                                  <div className="text-gray-600">Expected Results: {subflow.expectedResults}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

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
                onClick={() => handleRequirementClick(requirementId)}
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

      <Dialog open={showRequirementDialog} onOpenChange={setShowRequirementDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Requirement Details</DialogTitle>
          </DialogHeader>
          <div className="max-h-[70vh] overflow-y-auto">
            {selectedRequirement && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  {selectedRequirement}
                </h3>
                <div className="text-sm text-gray-600">
                  This dialog will show the complete requirement details including all business requirements,
                  business rules, and data elements associated with this requirement.
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

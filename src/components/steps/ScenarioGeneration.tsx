import { useState } from "react";
import { type Requirement } from "./requirement/types";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Plus, Edit2, Trash2 } from "lucide-react";
import { type TestScenario } from "./scenario/types";

interface ScenarioGenerationProps {
  selectedFile: { id: string; name: string; uploadTime: Date } | null;
}

const initialScenarios: TestScenario[] = [
  {
    id: "TS-001",
    title: "Standard Login",
    requirementId: "REQ-001",
    conditions: [
      {
        id: "COND-001",
        description: "Valid credentials login",
        requirementRef: "REQ-001.1"
      },
      {
        id: "COND-002",
        description: "Remember me functionality",
        requirementRef: "REQ-001.2"
      },
      {
        id: "COND-003",
        description: "Password validation rules",
        requirementRef: "REQ-001.3"
      }
    ],
    testCases: [
      {
        id: "TC-001",
        title: "Valid Login with Remember Me",
        scenarioId: "TS-001",
        requirementId: "REQ-001",
        testData: [
          { key: "Username", value: "john.doe@example.com" },
          { key: "Password", value: "Valid@123" },
          { key: "Remember Me", value: "Yes" }
        ],
        expectedResults: [
          "Login successful",
          "Session cookie created",
          "Remember me enabled"
        ]
      },
      {
        id: "TC-002",
        title: "Valid Login without Remember Me",
        scenarioId: "TS-001",
        requirementId: "REQ-001",
        testData: [
          { key: "Username", value: "jane.doe@example.com" },
          { key: "Password", value: "Valid@456" },
          { key: "Remember Me", value: "No" }
        ],
        expectedResults: [
          "Login successful",
          "Session cookie created"
        ]
      }
    ]
  },
  {
    id: "TS-002",
    title: "Failed Login",
    requirementId: "REQ-001",
    conditions: [
      {
        id: "COND-004",
        description: "Invalid username/password",
        requirementRef: "REQ-001.4"
      },
      {
        id: "COND-005",
        description: "Account lockout rules",
        requirementRef: "REQ-001.5"
      }
    ],
    testCases: [
      {
        id: "TC-003",
        title: "Invalid Username",
        scenarioId: "TS-002",
        requirementId: "REQ-001",
        testData: [
          { key: "Username", value: "invalid@example.com" },
          { key: "Password", value: "Valid@123" }
        ],
        expectedResults: [
          "Login failed",
          "Error message displayed: Invalid username"
        ]
      }
    ]
  }
];

export const ScenarioGeneration = ({ selectedFile }: ScenarioGenerationProps) => {
  const { toast } = useToast();
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [expandedScenarios, setExpandedScenarios] = useState<string[]>([]);
  const [scenarios, setScenarios] = useState<TestScenario[]>(initialScenarios);

  const handleScenarioClick = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    setExpandedScenarios(prev => 
      prev.includes(scenarioId) 
        ? prev.filter(id => id !== scenarioId)
        : [...prev, scenarioId]
    );
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
      {/* Left Panel - Test Scenarios */}
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
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {expandedScenarios.includes(scenario.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                    <div>
                      <div className="font-medium">{scenario.title}</div>
                      <div className="text-sm text-gray-500">
                        ID: {scenario.id} | Requirement: 
                        <button 
                          className="text-primary hover:underline ml-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle requirement click
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

                {/* Expanded Content */}
                {expandedScenarios.includes(scenario.id) && (
                  <div className="mt-4 space-y-4">
                    {/* Conditions */}
                    <div className="space-y-2">
                      <h4 className="font-medium">Conditions:</h4>
                      {scenario.conditions.map((condition) => (
                        <div
                          key={condition.id}
                          className="ml-4 flex items-start gap-2 text-sm"
                        >
                          <span className="text-gray-400">-</span>
                          <div>
                            <span>{condition.description}</span>
                            <span className="text-xs text-gray-500 ml-2">
                              [{condition.requirementRef}]
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Test Cases */}
                    <div className="space-y-2">
                      <h4 className="font-medium">Test Cases:</h4>
                      {scenario.testCases.map((testCase) => (
                        <div
                          key={testCase.id}
                          className="ml-4 p-2 border rounded bg-gray-50"
                        >
                          <div className="font-medium text-sm">{testCase.title}</div>
                          <div className="text-xs text-gray-500">ID: {testCase.id}</div>
                          
                          {/* Test Data */}
                          <div className="mt-2">
                            <div className="text-xs font-medium">Test Data:</div>
                            <div className="ml-2">
                              {testCase.testData.map((data, index) => (
                                <div key={index} className="text-xs">
                                  {data.key}: {data.value}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Expected Results */}
                          <div className="mt-2">
                            <div className="text-xs font-medium">Expected Results:</div>
                            <div className="ml-2">
                              {testCase.expectedResults.map((result, index) => (
                                <div key={index} className="text-xs">
                                  - {result}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Panel - Requirements Coverage */}
      <div className="w-1/3 border-l p-4">
        <div className="prose prose-sm">
          <h3 className="text-lg font-semibold mb-4">Requirements Coverage</h3>
          <div className="space-y-2">
            {scenarios.map(scenario => (
              <div
                key={scenario.id}
                className={cn(
                  "p-3 border rounded transition-colors",
                  selectedScenario === scenario.id 
                    ? "bg-primary/10 border-primary" 
                    : "hover:bg-gray-50"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium">{scenario.requirementId}</div>
                  <div className="text-sm text-gray-500">{scenario.testCases.length} Test Cases</div>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {scenario.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

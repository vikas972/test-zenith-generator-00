
import { useState } from "react";
import { type Requirement } from "./requirement/types";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Plus, Edit2, Trash2 } from "lucide-react";
import { type TestScenario, type TestScenarioCondition } from "./scenario/types";
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
    title: "Standard Login",
    requirementId: "REQ-001",
    conditions: [
      {
        id: "COND-001",
        description: "Valid credentials login",
        requirementRef: "REQ-001.1",
        coverageType: "business_requirement",
        requirementItemId: "BR-001"
      },
      {
        id: "COND-002",
        description: "Remember me functionality",
        requirementRef: "REQ-001.2",
        coverageType: "business_rule",
        requirementItemId: "BRU-001"
      },
      {
        id: "COND-003",
        description: "Password validation rules",
        requirementRef: "REQ-001.3",
        coverageType: "data_element",
        requirementItemId: "DE-001"
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
        requirementRef: "REQ-001.4",
        coverageType: "business_rule",
        requirementItemId: "BRU-002"
      },
      {
        id: "COND-005",
        description: "Account lockout rules",
        requirementRef: "REQ-001.5",
        coverageType: "business_rule",
        requirementItemId: "BRU-003"
      }
    ]
  }
];

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

  const getCoverageTypeLabel = (type: TestScenarioCondition["coverageType"]) => {
    switch (type) {
      case "business_requirement":
        return "Business Requirement";
      case "business_rule":
        return "Business Rule";
      case "data_element":
        return "Data Element";
      default:
        return "Unknown";
    }
  };

  const requirementGroups = Object.entries(
    scenarios.reduce((acc: { [key: string]: TestScenario[] }, scenario) => {
      if (!acc[scenario.requirementId]) {
        acc[scenario.requirementId] = [];
      }
      acc[scenario.requirementId].push(scenario);
      return acc;
    }, {})
  );

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

                {/* Expanded Content */}
                {expandedScenarios.includes(scenario.id) && (
                  <div className="mt-4">
                    <div className="space-y-4">
                      {["business_requirement", "business_rule", "data_element"].map((type) => {
                        const typeConditions = scenario.conditions.filter(
                          c => c.coverageType === type
                        );
                        
                        if (typeConditions.length === 0) return null;

                        return (
                          <div key={type} className="space-y-2">
                            <h4 className="font-medium">{getCoverageTypeLabel(type as TestScenarioCondition["coverageType"])} Coverage:</h4>
                            {typeConditions.map((condition) => (
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
                                  <span className="text-xs text-primary ml-2">
                                    {condition.requirementItemId}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })}
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
            {requirementGroups.map(([requirementId, relatedScenarios]) => (
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
                  Coverage Summary:
                  <ul className="mt-1 ml-4 list-disc text-xs">
                    {Object.entries(
                      relatedScenarios.flatMap(s => s.conditions)
                        .reduce((acc: { [key: string]: number }, condition) => {
                          acc[condition.coverageType] = (acc[condition.coverageType] || 0) + 1;
                          return acc;
                        }, {})
                    ).map(([type, count]) => (
                      <li key={type}>
                        {getCoverageTypeLabel(type as TestScenarioCondition["coverageType"])}: {count}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Requirement Dialog */}
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

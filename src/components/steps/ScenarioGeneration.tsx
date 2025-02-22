import { type SelectedFile } from "@/types";
import { useState } from "react";
import { ScenarioList } from "./scenario/components/ScenarioList";
import { RequirementsCoverage } from "./scenario/RequirementsCoverage";
import { TestScenario } from "./scenario/types";
import { ScenarioActions } from "./scenario/components/ScenarioActions";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScenarioGenerationProps {
  selectedFile: SelectedFile | null;
}

export const ScenarioGeneration = ({ selectedFile }: ScenarioGenerationProps) => {
  const [scenarios, setScenarios] = useState<TestScenario[]>([
    {
      id: "1",
      requirementId: "REQ-001",
      description: "Verify user can log in with valid credentials",
      flows: [
        {
          type: "happy",
          subflows: ["Enter username", "Enter password", "Click login button", "Verify successful login"],
        },
      ],
    },
    {
      id: "2",
      requirementId: "REQ-001",
      description: "Check error message when logging in with invalid credentials",
      flows: [
        {
          type: "sad",
          subflows: ["Enter username", "Enter incorrect password", "Click login button", "Verify error message"],
        },
      ],
    },
    {
      id: "3",
      requirementId: "REQ-002",
      description: "Test password reset functionality",
      flows: [
        {
          type: "happy",
          subflows: [
            "Click 'Forgot Password'",
            "Enter email",
            "Click 'Reset Password'",
            "Verify email sent",
            "Reset password using link from email",
          ],
        },
      ],
    },
  ]);

  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false);

  const handleRequirementClick = (requirementId: string) => {
    setSelectedScenario((prevSelectedScenario) => {
      if (
        prevSelectedScenario &&
        scenarios.find((s) => s.id === prevSelectedScenario)?.requirementId === requirementId
      ) {
        return null;
      } else {
        const firstScenarioId = scenarios.find((s) => s.requirementId === requirementId)?.id;
        return firstScenarioId || null;
      }
    });
  };

  return (
    <div className="flex-1">
      <div className="container mx-auto px-4 py-6">
        <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border">
          <ResizablePanel 
            defaultSize={30} 
            minSize={5} 
            maxSize={50}
            collapsible 
            collapsed={leftPanelCollapsed}
            className="relative"
          >
            <div className="h-full p-4">
              <ScenarioActions
                scenarios={scenarios}
                selectedScenarios={selectedScenarios}
                setScenarios={setScenarios}
                setSelectedScenarios={setSelectedScenarios}
              />
              <ScenarioList
                scenarios={scenarios}
                selectedScenario={selectedScenario}
                onScenarioClick={setSelectedScenario}
                selectedScenarios={selectedScenarios}
                onSelectedScenariosChange={setSelectedScenarios}
              />
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="absolute right-[-12px] top-1/2 transform -translate-y-1/2 z-10"
              onClick={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
            >
              {leftPanelCollapsed ? 
                <ChevronRight className="h-4 w-4" /> : 
                <ChevronLeft className="h-4 w-4" />
              }
            </Button>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={70}>
            <div className="flex h-full">
              <div className={`flex-1 p-4 ${rightPanelCollapsed ? 'mr-0' : 'mr-[200px]'}`}>
                {selectedScenario && scenarios.find((s) => s.id === selectedScenario) && (
                  <div className="prose prose-sm">
                    <h3>{scenarios.find((s) => s.id === selectedScenario)?.description}</h3>
                    <ul className="list-disc">
                      {scenarios
                        .find((s) => s.id === selectedScenario)
                        ?.flows.map((flow, index) => (
                          <li key={index}>
                            {flow.type}:
                            <ul className="list-disc ml-4">
                              {flow.subflows.map((subflow, subIndex) => (
                                <li key={subIndex}>{subflow}</li>
                              ))}
                            </ul>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="absolute right-0 h-full">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="absolute left-[-12px] top-1/2 transform -translate-y-1/2 z-10"
                  onClick={() => setRightPanelCollapsed(!rightPanelCollapsed)}
                >
                  {rightPanelCollapsed ? 
                    <ChevronLeft className="h-4 w-4" /> : 
                    <ChevronRight className="h-4 w-4" />
                  }
                </Button>
                {!rightPanelCollapsed && (
                  <RequirementsCoverage
                    scenarios={scenarios}
                    selectedScenario={selectedScenario}
                    onRequirementClick={handleRequirementClick}
                  />
                )}
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

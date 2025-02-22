
import { useState } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScenarioList } from "./scenario/components/ScenarioList";
import { RequirementsCoverage } from "./scenario/RequirementsCoverage";
import { TestScenario } from "./scenario/types";
import { ScenarioActions } from "./scenario/components/ScenarioActions";

interface ScenarioGenerationProps {
  selectedFile: { id: string; name: string; uploadTime: Date; } | null;
}

export const ScenarioGeneration = ({ selectedFile }: ScenarioGenerationProps) => {
  const [scenarios, setScenarios] = useState<TestScenario[]>([
    {
      id: "1",
      title: "Login with valid credentials",
      description: "Verify user can log in with valid credentials",
      requirementId: "REQ-001",
      priority: "high",
      status: "completed",
      flows: [
        {
          type: "primary",
          description: "Happy path login flow",
          subflows: [
            {
              name: "Enter username",
              coverage: "Username field input",
              expectedResults: "Username entered successfully",
            },
            {
              name: "Enter password",
              coverage: "Password field input",
              expectedResults: "Password entered successfully",
            },
            {
              name: "Click login button",
              coverage: "Login button interaction",
              expectedResults: "Login button clicked",
            },
            {
              name: "Verify successful login",
              coverage: "Login success verification",
              expectedResults: "User successfully logged in",
            }
          ],
        },
      ],
    },
    {
      id: "2",
      title: "Login with invalid credentials",
      description: "Check error message when logging in with invalid credentials",
      requirementId: "REQ-001",
      priority: "high",
      status: "completed",
      flows: [
        {
          type: "negative",
          description: "Invalid credentials flow",
          subflows: [
            {
              name: "Enter username",
              coverage: "Username field input",
              expectedResults: "Username entered successfully",
            },
            {
              name: "Enter incorrect password",
              coverage: "Invalid password input",
              expectedResults: "Invalid password entered",
            },
            {
              name: "Click login button",
              coverage: "Login button interaction",
              expectedResults: "Login button clicked",
            },
            {
              name: "Verify error message",
              coverage: "Error message verification",
              expectedResults: "Error message displayed correctly",
            }
          ],
        },
      ],
    },
    {
      id: "3",
      title: "Password reset functionality",
      description: "Test password reset functionality",
      requirementId: "REQ-002",
      priority: "medium",
      status: "completed",
      flows: [
        {
          type: "primary",
          description: "Password reset flow",
          subflows: [
            {
              name: "Click 'Forgot Password'",
              coverage: "Password reset initiation",
              expectedResults: "Password reset flow initiated",
            },
            {
              name: "Enter email",
              coverage: "Email input for reset",
              expectedResults: "Email entered successfully",
            },
            {
              name: "Click 'Reset Password'",
              coverage: "Reset password submission",
              expectedResults: "Reset password request submitted",
            },
            {
              name: "Verify email sent",
              coverage: "Email delivery verification",
              expectedResults: "Reset email sent successfully",
            },
            {
              name: "Reset password using link from email",
              coverage: "Password reset completion",
              expectedResults: "Password successfully reset",
            }
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
    <div className="flex-1 bg-gray-50">
      <div className="container mx-auto py-6">
        <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-12rem)] rounded-lg bg-white">
          <ResizablePanel 
            defaultSize={25} 
            minSize={20} 
            maxSize={40}
            onCollapse={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
            className="relative"
          >
            <div className="h-full p-4 overflow-y-auto">
              <ScenarioActions
                scenarios={scenarios}
                selectedScenarios={selectedScenarios}
                setScenarios={setScenarios}
                setSelectedScenarios={setSelectedScenarios}
              />
              <div className="mt-4">
                <ScenarioList
                  scenarios={scenarios}
                  selectedScenario={selectedScenario}
                  onScenarioClick={setSelectedScenario}
                  selectedScenarios={selectedScenarios}
                  setSelectedScenarios={setSelectedScenarios}
                />
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="absolute right-[-12px] top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-sm border"
              onClick={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
            >
              {leftPanelCollapsed ? 
                <ChevronRight className="h-4 w-4" /> : 
                <ChevronLeft className="h-4 w-4" />
              }
            </Button>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full relative">
              <div className={`flex-1 p-6 overflow-y-auto ${rightPanelCollapsed ? 'mr-0' : 'mr-[300px]'}`}>
                {selectedScenario && scenarios.find((s) => s.id === selectedScenario) && (
                  <div className="prose prose-sm max-w-none">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {scenarios.find((s) => s.id === selectedScenario)?.description}
                    </h3>
                    <ul className="list-disc mt-4">
                      {scenarios
                        .find((s) => s.id === selectedScenario)
                        ?.flows.map((flow, index) => (
                          <li key={index} className="mt-2">
                            <span className="font-medium">{flow.type}:</span>
                            <ul className="list-disc ml-6 mt-1">
                              {flow.subflows.map((subflow, subIndex) => (
                                <li key={subIndex} className="text-gray-600">{subflow.name}</li>
                              ))}
                            </ul>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="absolute right-0 h-full border-l bg-white" style={{ width: rightPanelCollapsed ? 'auto' : '300px' }}>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="absolute left-[-12px] top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-sm border"
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

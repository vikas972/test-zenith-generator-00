
import { useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScenarioGridDialog } from "./scenario/dialogs/ScenarioGridDialog";
import { ScenarioDialog } from "./scenario/dialogs/ScenarioDialog";
import { RequirementDialog } from "./scenario/dialogs/RequirementDialog";
import { TestCase, TestCasesProps } from "./test-cases/types";
import { TestCaseCard } from "./test-cases/TestCaseCard";
import { CoverageAnalysis } from "./test-cases/CoverageAnalysis";
import { mockTestCases } from "./test-cases/mockData";
import { TestScenario } from "./scenario/types";

const transformTestCaseToScenario = (testCase: TestCase): TestScenario => {
  return {
    id: testCase.id,
    title: testCase.title,
    description: testCase.description,
    requirementId: testCase.requirementId,
    priority: testCase.priority,
    status: testCase.status,
    flows: [
      {
        type: "primary",
        description: "Main test flow",
        subflows: testCase.testSteps.map((step, index) => ({
          name: `Step ${index + 1}`,
          coverage: step.step,
          expectedResults: step.expected,
          entries: []
        }))
      }
    ]
  };
};

export const TestCases = ({ selectedFile }: TestCasesProps) => {
  const [isLeftPanelMaximized, setIsLeftPanelMaximized] = useState(false);
  const [isRightPanelMaximized, setIsRightPanelMaximized] = useState(false);
  const [selectedTestCases, setSelectedTestCases] = useState<string[]>([]);
  const [selectedTestCase, setSelectedTestCase] = useState<TestCase | null>(null);
  const [expandedTestCases, setExpandedTestCases] = useState<string[]>([]);
  const [showGridDialog, setShowGridDialog] = useState(false);
  const [showScenarioDialog, setShowScenarioDialog] = useState(false);
  const [showRequirementDialog, setShowRequirementDialog] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [selectedRequirement, setSelectedRequirement] = useState<string | null>(null);

  const toggleLeftPanel = () => {
    setIsLeftPanelMaximized(!isLeftPanelMaximized);
    setIsRightPanelMaximized(false);
  };

  const toggleRightPanel = () => {
    setIsRightPanelMaximized(!isRightPanelMaximized);
    setIsLeftPanelMaximized(false);
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedTestCases(checked ? mockTestCases.map(tc => tc.id) : []);
  };

  const toggleTestCase = (testCaseId: string) => {
    setExpandedTestCases(prev =>
      prev.includes(testCaseId)
        ? prev.filter(id => id !== testCaseId)
        : [...prev, testCaseId]
    );
  };

  const handleRequirementClick = (requirementId: string) => {
    setSelectedRequirement(requirementId);
    setShowRequirementDialog(true);
  };

  const handleScenarioClick = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    setShowScenarioDialog(true);
  };

  const handleStatusChange = (status: "completed" | "in_progress" | "needs_review") => {
    const updatedTestCases = mockTestCases.map(testCase => 
      selectedTestCases.includes(testCase.id) ? { ...testCase, status } : testCase
    );
    console.log("Updated test cases with new status:", updatedTestCases);
  };

  const scenariosForGrid = mockTestCases.map(transformTestCaseToScenario);

  const handleTestCaseClick = (testCase: TestCase) => {
    setSelectedTestCase(testCase);
  };

  return (
    <>
      <div className="flex gap-4 h-full">
        <div
          className={cn(
            "flex flex-col transition-all duration-300",
            isLeftPanelMaximized ? "w-full" : "w-2/3",
            isRightPanelMaximized ? "w-0 hidden" : "flex"
          )}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <Checkbox
                checked={selectedTestCases.length === mockTestCases.length}
                onCheckedChange={handleSelectAll}
              />
              <h2 className="text-lg font-semibold">Test Cases</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowGridDialog(true)}>
                Grid View
              </Button>
              <Button variant="outline" size="sm">
                New Test Case
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm">
                      Status
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" align="end" className="w-48">
                    <div className="flex flex-col gap-2 p-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleStatusChange("completed")}
                      >
                        Mark as Completed
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleStatusChange("needs_review")}
                      >
                        Needs Review
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleStatusChange("in_progress")}
                      >
                        In Progress
                      </Button>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button variant="destructive" size="sm">
                Delete Selected
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLeftPanel}
              >
                {isLeftPanelMaximized ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="pr-4">
              {mockTestCases.map((testCase) => (
                <TestCaseCard
                  key={testCase.id}
                  testCase={testCase}
                  isExpanded={expandedTestCases.includes(testCase.id)}
                  isSelected={selectedTestCase?.id === testCase.id}
                  onSelect={(checked) => {
                    setSelectedTestCases(prev =>
                      checked
                        ? [...prev, testCase.id]
                        : prev.filter(id => id !== testCase.id)
                    );
                  }}
                  onToggle={() => toggleTestCase(testCase.id)}
                  onScenarioClick={handleScenarioClick}
                  onRequirementClick={handleRequirementClick}
                  onClick={() => handleTestCaseClick(testCase)}
                />
              ))}
            </div>
          </ScrollArea>
        </div>

        <div
          className={cn(
            "flex flex-col transition-all duration-300",
            isRightPanelMaximized ? "w-full" : "w-1/3",
            isLeftPanelMaximized ? "w-0 hidden" : "flex"
          )}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Coverage Analysis</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleRightPanel}
            >
              {isRightPanelMaximized ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <CoverageAnalysis selectedTestCase={selectedTestCase} />
          </ScrollArea>
        </div>
      </div>

      <ScenarioGridDialog
        open={showGridDialog}
        onOpenChange={setShowGridDialog}
        scenarios={scenariosForGrid}
      />

      <ScenarioDialog
        open={showScenarioDialog}
        onOpenChange={setShowScenarioDialog}
        selectedScenario={selectedScenario}
      />

      <RequirementDialog
        open={showRequirementDialog}
        onOpenChange={setShowRequirementDialog}
        selectedRequirement={selectedRequirement}
      />
    </>
  );
};

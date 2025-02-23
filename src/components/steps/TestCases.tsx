import { useState } from "react";
import { Maximize2, Minimize2, PieChart, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

interface TestCase {
  id: string;
  title: string;
  scenarioId: string;
  requirementId: string;
  priority: "high" | "medium" | "low";
  description: string;
  preconditions: string[];
  testData: {
    field: string;
    value: string;
  }[];
  testSteps: {
    step: string;
    input: string;
    expected: string;
  }[];
  expectedResults: string[];
  postconditions: string[];
  status: "completed" | "in_progress" | "needs_review";
}

const mockTestCases: TestCase[] = [
  {
    id: "TC-001",
    title: "Verify Successful Login",
    scenarioId: "TS-001",
    requirementId: "REQ-001",
    priority: "high",
    description: "Verify user can login with valid credentials",
    preconditions: [
      "User account exists",
      "User is not logged in",
      "System is accessible"
    ],
    testData: [
      { field: "Username", value: "john.doe@example.com" },
      { field: "Password", value: "Valid@123" },
      { field: "Remember Me", value: "Yes" }
    ],
    testSteps: [
      {
        step: "Navigate to login page",
        input: "https://app.com/login",
        expected: "Login form displays"
      },
      {
        step: "Enter username",
        input: "john.doe@example.com",
        expected: "Field accepts input"
      },
      {
        step: "Enter password",
        input: "Valid@123",
        expected: "Password masked"
      },
      {
        step: "Click login button",
        input: "Click action",
        expected: "Form submits"
      }
    ],
    expectedResults: [
      "User successfully logged in",
      "Dashboard displayed",
      "Username visible in header"
    ],
    postconditions: [
      "User session created",
      "Audit log updated"
    ],
    status: "completed"
  }
];

interface TestCasesProps {
  selectedFile: { id: string; name: string; uploadTime: Date } | null;
}

interface CoverageStats {
  scenarioCoverage: number;
  requirementCoverage: number;
  testCaseCount: number;
  scenarioCount: number;
}

export const TestCases = ({ selectedFile }: TestCasesProps) => {
  const [isLeftPanelMaximized, setIsLeftPanelMaximized] = useState(false);
  const [isRightPanelMaximized, setIsRightPanelMaximized] = useState(false);
  const [selectedTestCases, setSelectedTestCases] = useState<string[]>([]);
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

  const TestCaseCard = ({ testCase }: { testCase: TestCase }) => {
    const isExpanded = expandedTestCases.includes(testCase.id);
    const isSelected = selectedTestCases.includes(testCase.id);

    return (
      <Card
        className={cn(
          "mb-4 transition-all",
          isSelected && "border-primary"
        )}
      >
        <CardHeader className="p-4">
          <div className="flex items-center gap-3">
            <Checkbox
              checked={isSelected}
              onCheckedChange={(checked) => {
                setSelectedTestCases(prev =>
                  checked
                    ? [...prev, testCase.id]
                    : prev.filter(id => id !== testCase.id)
                );
              }}
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{testCase.id}</span>
                <span className="text-gray-500">-</span>
                <span>{testCase.title}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-primary/10"
                  onClick={() => handleScenarioClick(testCase.scenarioId)}
                >
                  {testCase.scenarioId}
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-primary/10"
                  onClick={() => handleRequirementClick(testCase.requirementId)}
                >
                  {testCase.requirementId}
                </Badge>
                <Badge>{testCase.priority}</Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleTestCase(testCase.id)}
            >
              {isExpanded ? "Collapse" : "Expand"}
            </Button>
          </div>
        </CardHeader>
        {isExpanded && (
          <CardContent className="px-4 pb-4">
            <div className="space-y-4">
              <section>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-gray-600">{testCase.description}</p>
              </section>

              <section>
                <h4 className="font-medium mb-2">Pre-conditions</h4>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  {testCase.preconditions.map((condition, index) => (
                    <li key={index}>{condition}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h4 className="font-medium mb-2">Test Data</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {testCase.testData.map((data, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-600">{data.field}:</span>
                      <span>{data.value}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h4 className="font-medium mb-2">Test Steps</h4>
                <div className="space-y-3">
                  {testCase.testSteps.map((step, index) => (
                    <div key={index} className="text-sm">
                      <div className="font-medium">{index + 1}. {step.step}</div>
                      <div className="ml-4 text-gray-600">
                        <div>Input: {step.input}</div>
                        <div>Expected: {step.expected}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h4 className="font-medium mb-2">Expected Results</h4>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  {testCase.expectedResults.map((result, index) => (
                    <li key={index}>{result}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h4 className="font-medium mb-2">Post-conditions</h4>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  {testCase.postconditions.map((condition, index) => (
                    <li key={index}>{condition}</li>
                  ))}
                </ul>
              </section>
            </div>
          </CardContent>
        )}
      </Card>
    );
  };

  const CoverageAnalysis = () => {
    const stats: CoverageStats = {
      scenarioCoverage: 75,
      requirementCoverage: 85,
      testCaseCount: mockTestCases.length,
      scenarioCount: 3
    };

    return (
      <div className="space-y-4 pr-4">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Overall Coverage</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 border rounded">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Requirements</span>
                      <div className="flex items-center gap-2">
                        <PieChart className={cn(
                          "h-4 w-4",
                          stats.requirementCoverage >= 90 ? "text-green-500" : "text-amber-500"
                        )} />
                        <span className="font-medium">{stats.requirementCoverage}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border rounded">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Scenarios</span>
                      <div className="flex items-center gap-2">
                        <PieChart className={cn(
                          "h-4 w-4",
                          stats.scenarioCoverage >= 90 ? "text-green-500" : "text-amber-500"
                        )} />
                        <span className="font-medium">{stats.scenarioCoverage}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Test Cases Distribution</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Test Cases</span>
                    <span className="font-medium">{stats.testCaseCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Scenarios Covered</span>
                    <span className="font-medium">{stats.scenarioCount}</span>
                  </div>
                </div>
              </div>

              {stats.requirementCoverage < 100 && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded">
                  <div className="flex items-center gap-2 text-amber-600 mb-2">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Coverage Gaps</span>
                  </div>
                  <ul className="space-y-1">
                    <li className="text-sm text-amber-700 flex items-start gap-2">
                      <span>•</span>
                      <span>Some requirements are not fully covered by test cases</span>
                    </li>
                    <li className="text-sm text-amber-700 flex items-start gap-2">
                      <span>•</span>
                      <span>Consider adding more test cases for edge cases</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
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
                <TestCaseCard key={testCase.id} testCase={testCase} />
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
            <CoverageAnalysis />
          </ScrollArea>
        </div>
      </div>

      <ScenarioGridDialog
        open={showGridDialog}
        onOpenChange={setShowGridDialog}
        scenarios={mockTestCases}
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

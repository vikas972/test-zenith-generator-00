
import { AlertCircle, CheckCircle, PieChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CoverageStats, TestCase } from "./types";
import { mockTestCases } from "./mockData";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CoverageAnalysisProps {
  selectedTestCase?: TestCase | null;
}

export const CoverageAnalysis = ({ selectedTestCase }: CoverageAnalysisProps) => {
  const stats: CoverageStats = {
    scenarioCoverage: 75,
    requirementCoverage: 85,
    testCaseCount: mockTestCases.length,
    scenarioCount: new Set(mockTestCases.map(tc => tc.scenarioId)).size
  };

  // Group test cases by requirement
  const requirementGroups = mockTestCases.reduce((acc: { [key: string]: TestCase[] }, testCase) => {
    if (!acc[testCase.requirementId]) {
      acc[testCase.requirementId] = [];
    }
    acc[testCase.requirementId].push(testCase);
    return acc;
  }, {});

  // Calculate coverage for each requirement
  const calculateRequirementCoverage = (testCases: TestCase[]) => {
    const completed = testCases.filter(tc => tc.status === "completed").length;
    return Math.round((completed / testCases.length) * 100);
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

            <div>
              <h3 className="font-medium mb-2">Requirements Coverage</h3>
              <div className="space-y-2">
                {Object.entries(requirementGroups).map(([reqId, testCases]) => {
                  const coverage = calculateRequirementCoverage(testCases);
                  const isSelected = selectedTestCase?.requirementId === reqId;
                  
                  return (
                    <div
                      key={reqId}
                      className={cn(
                        "p-3 border rounded transition-colors",
                        isSelected && "border-primary bg-primary/5"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{reqId}</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <div className="flex items-center gap-2">
                                {coverage === 100 ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  <AlertCircle className="h-4 w-4 text-amber-500" />
                                )}
                                <span className="font-medium">{coverage}%</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{testCases.length} test cases</p>
                              <p>{testCases.filter(tc => tc.status === "completed").length} completed</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                        <div>
                          High Priority: {testCases.filter(tc => tc.priority === "high").length}
                        </div>
                        <div>
                          Completed: {testCases.filter(tc => tc.status === "completed").length}
                        </div>
                      </div>
                    </div>
                  );
                })}
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

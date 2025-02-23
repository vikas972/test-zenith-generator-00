
import { AlertCircle, CheckCircle, FileText, GitBranch } from "lucide-react";
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

  // Get all unique scenarios and requirements
  const allScenarios = new Set(mockTestCases.map(tc => tc.scenarioId));
  const allRequirements = new Set(mockTestCases.map(tc => tc.requirementId));

  // Calculate coverage percentages for the selected test case
  const getScenarioCoverage = (scenarioId: string) => {
    const scenarioTests = mockTestCases.filter(tc => tc.scenarioId === scenarioId);
    const completed = scenarioTests.filter(tc => tc.status === "completed").length;
    return Math.round((completed / scenarioTests.length) * 100);
  };

  const getRequirementCoverage = (requirementId: string) => {
    const requirementTests = mockTestCases.filter(tc => tc.requirementId === requirementId);
    const completed = requirementTests.filter(tc => tc.status === "completed").length;
    return Math.round((completed / requirementTests.length) * 100);
  };

  return (
    <div className="space-y-4 pr-4">
      {!selectedTestCase ? (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-center h-40 text-gray-500">
              Select a test case to view coverage details
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Selected Test Case
              </h3>
              <div className="p-3 border rounded bg-primary/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{selectedTestCase.id}</span>
                  <Badge variant={selectedTestCase.status === "completed" ? "default" : "secondary"}>
                    {selectedTestCase.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{selectedTestCase.title}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <GitBranch className="h-4 w-4" />
                Coverage Details
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Scenario Coverage</h4>
                  <div className="p-3 border rounded">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">{selectedTestCase.scenarioId}</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="flex items-center gap-2">
                              {getScenarioCoverage(selectedTestCase.scenarioId) === 100 ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <AlertCircle className="h-4 w-4 text-amber-500" />
                              )}
                              <span className="font-medium">
                                {getScenarioCoverage(selectedTestCase.scenarioId)}%
                              </span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Coverage for this scenario</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="text-xs text-gray-600">
                      {mockTestCases.filter(tc => tc.scenarioId === selectedTestCase.scenarioId).length} test cases
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Requirement Coverage</h4>
                  <div className="p-3 border rounded">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">{selectedTestCase.requirementId}</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="flex items-center gap-2">
                              {getRequirementCoverage(selectedTestCase.requirementId) === 100 ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <AlertCircle className="h-4 w-4 text-amber-500" />
                              )}
                              <span className="font-medium">
                                {getRequirementCoverage(selectedTestCase.requirementId)}%
                              </span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Coverage for this requirement</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="text-xs text-gray-600">
                      {mockTestCases.filter(tc => tc.requirementId === selectedTestCase.requirementId).length} test cases
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-4">Overall Progress</h3>
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
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

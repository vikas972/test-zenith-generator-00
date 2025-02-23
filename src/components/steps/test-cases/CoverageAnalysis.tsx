
import { AlertCircle, PieChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CoverageStats } from "./types";

export const CoverageAnalysis = () => {
  const stats: CoverageStats = {
    scenarioCoverage: 75,
    requirementCoverage: 85,
    testCaseCount: 1,
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

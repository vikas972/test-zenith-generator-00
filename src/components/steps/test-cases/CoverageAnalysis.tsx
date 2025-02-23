
import { AlertCircle, CheckCircle, FileText, GitBranch, Waves } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CoverageStats, TestCase } from "./types";
import { mockTestCases } from "./mockData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RequirementDialog } from "../scenario/dialogs/RequirementDialog";
import { ScenarioDialog } from "../scenario/dialogs/ScenarioDialog";

interface CoverageAnalysisProps {
  selectedTestCase?: TestCase | null;
}

export const CoverageAnalysis = ({ selectedTestCase }: CoverageAnalysisProps) => {
  if (!selectedTestCase) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-center h-40 text-gray-500">
            Select a test case to view coverage details
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate scenario flow coverage
  const getScenarioFlowCoverage = (scenarioId: string) => {
    const scenarioTests = mockTestCases.filter(tc => tc.scenarioId === scenarioId);
    const totalFlows = 7; // This would come from scenario data in a real implementation
    const coveredFlows = 4; // This would be calculated from actual data
    return {
      percentage: Math.round((coveredFlows / totalFlows) * 100),
      covered: coveredFlows,
      total: totalFlows
    };
  };

  const scenarioCoverage = getScenarioFlowCoverage(selectedTestCase.scenarioId);

  return (
    <div className="space-y-4 pr-4">
      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <Waves className="h-4 w-4" />
            Coverage Details
          </h3>
          
          <Dialog>
            <DialogTrigger asChild>
              <div className="space-y-4 cursor-pointer hover:bg-accent rounded-lg p-4 transition-colors">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Linked Requirement</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedTestCase.requirementId} (User Authentication)
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Linked Scenario</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedTestCase.scenarioId} (User Authentication)
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Flow Covered</h4>
                    <p className="text-sm text-muted-foreground">
                      Primary flow (standard login)
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Overall Scenario Coverage</h4>
                    <div className="flex items-center gap-2">
                      {scenarioCoverage.percentage === 100 ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                      )}
                      <p className="text-sm text-muted-foreground">
                        {scenarioCoverage.percentage}% ({scenarioCoverage.covered} out of {scenarioCoverage.total} flows covered)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogTrigger>

            <DialogContent className="max-w-4xl h-[80vh]">
              <DialogHeader>
                <DialogTitle>Coverage Details</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="requirement" className="h-full">
                <TabsList>
                  <TabsTrigger value="requirement">Requirement</TabsTrigger>
                  <TabsTrigger value="scenario">Test Scenario</TabsTrigger>
                </TabsList>
                <TabsContent value="requirement" className="h-[calc(100%-48px)] overflow-y-auto">
                  <RequirementDialog
                    open={true}
                    onOpenChange={() => {}}
                    selectedRequirement={selectedTestCase.requirementId}
                  />
                </TabsContent>
                <TabsContent value="scenario" className="h-[calc(100%-48px)] overflow-y-auto">
                  <ScenarioDialog
                    open={true}
                    onOpenChange={() => {}}
                    selectedScenario={selectedTestCase.scenarioId}
                  />
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

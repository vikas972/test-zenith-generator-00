
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Maximize2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { TestScenario } from "../types";

interface ScenarioGridDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scenarios: TestScenario[]; 
}

export const ScenarioGridDialog = ({ 
  open, 
  onOpenChange, 
  scenarios = []
}: ScenarioGridDialogProps) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleExport = () => {
    console.log("Export to Excel");
  };

  const dialogClass = isFullScreen 
    ? "w-screen h-screen max-w-none rounded-none" 
    : "w-[90vw] h-[80vh] max-w-[1200px]";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={dialogClass}>
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Test Scenarios Overview</DialogTitle>
          <div className="flex gap-2">
            <Button variant="outline" onClick={toggleFullScreen}>
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export to Excel
            </Button>
          </div>
        </DialogHeader>
        <DialogDescription className="sr-only">
          A grid view of all test scenarios with their details and relationships
        </DialogDescription>
        <ScrollArea className="h-[calc(100%-80px)]">
          <div className="p-4 w-full overflow-auto">
            <div className="min-w-[1200px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Requirement</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Flows</TableHead>
                    {/* Add RTM information */}
                    <TableHead>Related Test Cases</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scenarios?.map((scenario) => (
                    <TableRow key={scenario.id}>
                      <TableCell className="font-medium">{scenario.id}</TableCell>
                      <TableCell>{scenario.title}</TableCell>
                      <TableCell>{scenario.requirementId}</TableCell>
                      <TableCell className="capitalize">{scenario.priority}</TableCell>
                      <TableCell className="capitalize">{scenario.status || 'n/a'}</TableCell>
                      <TableCell className="max-w-md truncate">{scenario.description}</TableCell>
                      <TableCell>
                        {scenario.flows?.length > 0 ? scenario.flows.length + ' flows' : 'No flows'}
                      </TableCell>
                      <TableCell>
                        {(scenario as any).testCaseId || 'None'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {(!scenarios || scenarios.length === 0) && (
                <div className="text-center py-4 text-gray-500">
                  No scenarios available
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

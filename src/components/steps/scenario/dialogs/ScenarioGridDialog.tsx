
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
  scenarios: TestScenario[]; // Changed from testCases to scenarios to match the prop being passed
}

export const ScenarioGridDialog = ({ open, onOpenChange, scenarios }: ScenarioGridDialogProps) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleExport = () => {
    // TODO: Implement export functionality
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
        <ScrollArea className="h-[calc(100%-80px)]">
          <div className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Requirement</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scenarios.map((scenario) => (
                  <TableRow key={scenario.id}>
                    <TableCell className="font-medium">{scenario.id}</TableCell>
                    <TableCell>{scenario.title}</TableCell>
                    <TableCell>{scenario.requirementId}</TableCell>
                    <TableCell className="capitalize">{scenario.priority}</TableCell>
                    <TableCell className="capitalize">{scenario.status || 'n/a'}</TableCell>
                    <TableCell className="max-w-md truncate">{scenario.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

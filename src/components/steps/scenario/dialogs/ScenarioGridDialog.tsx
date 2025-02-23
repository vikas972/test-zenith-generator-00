
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

interface ScenarioGridDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  testCases: any[]; // Will be properly typed when integrated
}

export const ScenarioGridDialog = ({ open, onOpenChange, testCases }: ScenarioGridDialogProps) => {
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
          <DialogTitle>Test Cases Overview</DialogTitle>
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
                  <TableHead>Scenario</TableHead>
                  <TableHead>Requirement</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testCases.map((testCase) => (
                  <TableRow key={testCase.id}>
                    <TableCell className="font-medium">{testCase.id}</TableCell>
                    <TableCell>{testCase.title}</TableCell>
                    <TableCell>{testCase.scenarioId}</TableCell>
                    <TableCell>{testCase.requirementId}</TableCell>
                    <TableCell className="capitalize">{testCase.priority}</TableCell>
                    <TableCell className="capitalize">{testCase.status}</TableCell>
                    <TableCell className="max-w-md truncate">{testCase.description}</TableCell>
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


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
import { Requirement } from "../types";

interface RequirementGridDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  requirements: Requirement[];
}

export const RequirementGridDialog = ({ 
  open, 
  onOpenChange, 
  requirements = [] 
}: RequirementGridDialogProps) => {
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
          <DialogTitle>Requirements Overview</DialogTitle>
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
          A grid view of all requirements with their details and status
        </DialogDescription>
        <ScrollArea className="h-[calc(100%-80px)]">
          <div className="p-4 w-full overflow-auto">
            <div className="min-w-[1200px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Requirement ID</TableHead>
                    <TableHead>Functional Area</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>Source</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requirements?.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell className="font-medium">{req.id}</TableCell>
                      <TableCell>{req.requirementId}</TableCell>
                      <TableCell>{req.functionalArea}</TableCell>
                      <TableCell className="max-w-md truncate">{req.description}</TableCell>
                      <TableCell className="capitalize">{req.status}</TableCell>
                      <TableCell>{(req.confidence * 100).toFixed(0)}%</TableCell>
                      <TableCell>Page {req.source.page}, Para {req.source.paragraph}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {(!requirements || requirements.length === 0) && (
                <div className="text-center py-4 text-gray-500">
                  No requirements available
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

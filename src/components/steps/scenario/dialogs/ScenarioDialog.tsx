
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ScenarioDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedScenario: string | null;
}

export const ScenarioDialog = ({
  open,
  onOpenChange,
  selectedScenario,
}: ScenarioDialogProps) => {
  if (!selectedScenario) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Test Scenario Details</DialogTitle>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">{selectedScenario}</h3>
              {/* Add scenario details here */}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

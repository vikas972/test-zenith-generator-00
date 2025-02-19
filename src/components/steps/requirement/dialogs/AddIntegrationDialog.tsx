
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddIntegrationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newIntegration: {
    system: string;
    type: string;
    expectedBehavior: string;
  };
  onIntegrationChange: (key: string, value: string) => void;
  onAdd: () => void;
}

export const AddIntegrationDialog = ({
  isOpen,
  onOpenChange,
  newIntegration,
  onIntegrationChange,
  onAdd
}: AddIntegrationDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Integration Point</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input
            placeholder="External System"
            value={newIntegration.system}
            onChange={(e) => onIntegrationChange("system", e.target.value)}
          />
          <Input
            placeholder="Integration Type"
            value={newIntegration.type}
            onChange={(e) => onIntegrationChange("type", e.target.value)}
          />
          <Input
            placeholder="Expected Behavior"
            value={newIntegration.expectedBehavior}
            onChange={(e) => onIntegrationChange("expectedBehavior", e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onAdd}>Add Integration</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

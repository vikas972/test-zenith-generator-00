
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddBehaviorDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newBehavior: {
    type: "success" | "error" | "system";
    condition: string;
    outcome: string;
  };
  onBehaviorChange: (key: string, value: string) => void;
  onAdd: () => void;
}

export const AddBehaviorDialog = ({
  isOpen,
  onOpenChange,
  newBehavior,
  onBehaviorChange,
  onAdd
}: AddBehaviorDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Expected Behavior</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <select
            className="w-full border rounded-md p-2"
            value={newBehavior.type}
            onChange={(e) => onBehaviorChange("type", e.target.value)}
          >
            <option value="success">Success Condition</option>
            <option value="error">Error Condition</option>
            <option value="system">System Response</option>
          </select>
          <Input
            placeholder="Condition"
            value={newBehavior.condition}
            onChange={(e) => onBehaviorChange("condition", e.target.value)}
          />
          <Input
            placeholder="Expected Outcome"
            value={newBehavior.outcome}
            onChange={(e) => onBehaviorChange("outcome", e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onAdd}>Add Behavior</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

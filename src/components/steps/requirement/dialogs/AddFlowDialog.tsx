
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type FlowType = "primary" | "alternative" | "exception";

interface AddFlowDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: () => void;
  flow: { description: string; type: FlowType };
  onFlowChange: (flow: { description: string; type: FlowType }) => void;
}

export const AddFlowDialog = ({ isOpen, onOpenChange, onAdd, flow, onFlowChange }: AddFlowDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Flow</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="flowDescription">Description</Label>
            <Input
              id="flowDescription"
              value={flow.description}
              onChange={(e) => onFlowChange({ ...flow, description: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="flowType">Type</Label>
            <Select
              value={flow.type}
              onValueChange={(value: FlowType) => onFlowChange({ ...flow, type: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primary">Primary</SelectItem>
                <SelectItem value="alternative">Alternative</SelectItem>
                <SelectItem value="exception">Exception</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={onAdd}>Add Flow</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

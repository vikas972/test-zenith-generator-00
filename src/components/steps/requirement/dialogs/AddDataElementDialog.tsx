
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddDataElementDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: () => void;
  element: { name: string; type: string; required: boolean };
  onElementChange: (element: { name: string; type: string; required: boolean }) => void;
}

export const AddDataElementDialog = ({ isOpen, onOpenChange, onAdd, element, onElementChange }: AddDataElementDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Data Element</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="elementName">Name</Label>
            <Input
              id="elementName"
              value={element.name}
              onChange={(e) => onElementChange({ ...element, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="elementType">Type</Label>
            <Input
              id="elementType"
              value={element.type}
              onChange={(e) => onElementChange({ ...element, type: e.target.value })}
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="elementRequired"
              checked={element.required}
              onChange={(e) => onElementChange({ ...element, required: e.target.checked })}
            />
            <Label htmlFor="elementRequired">Required</Label>
          </div>
          <Button onClick={onAdd}>Add Data Element</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

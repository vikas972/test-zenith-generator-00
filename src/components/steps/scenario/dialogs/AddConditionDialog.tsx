
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AddConditionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (condition: { name: string; coverage: string; expectedResults: string }) => void;
}

export const AddConditionDialog = ({ isOpen, onClose, onAdd }: AddConditionDialogProps) => {
  const [name, setName] = useState("");
  const [coverage, setCoverage] = useState("");
  const [expectedResults, setExpectedResults] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, coverage, expectedResults });
    setName("");
    setCoverage("");
    setExpectedResults("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Condition</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter condition name"
              required
            />
          </div>
          <div>
            <Label htmlFor="coverage">Coverage</Label>
            <Textarea
              id="coverage"
              value={coverage}
              onChange={(e) => setCoverage(e.target.value)}
              placeholder="Enter coverage details"
              required
            />
          </div>
          <div>
            <Label htmlFor="expectedResults">Expected Results</Label>
            <Textarea
              id="expectedResults"
              value={expectedResults}
              onChange={(e) => setExpectedResults(e.target.value)}
              placeholder="Enter expected results"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Condition</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

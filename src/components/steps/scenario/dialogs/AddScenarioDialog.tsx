
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type TestScenario, type Priority, type ScenarioStatus } from "../types";

interface AddScenarioDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (scenario: Omit<TestScenario, "id">) => void;
  requirementId: string;
  editingScenario?: TestScenario | null;
}

export const AddScenarioDialog = ({
  open,
  onOpenChange,
  onSave,
  requirementId,
  editingScenario,
}: AddScenarioDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [status, setStatus] = useState<ScenarioStatus>("in_progress");

  useEffect(() => {
    if (editingScenario) {
      setTitle(editingScenario.title);
      setDescription(editingScenario.description);
      setPriority(editingScenario.priority);
      setStatus(editingScenario.status || "in_progress");
    } else {
      setTitle("");
      setDescription("");
      setPriority("medium");
      setStatus("in_progress");
    }
  }, [editingScenario]);

  const handleSave = () => {
    onSave({
      title,
      description,
      priority,
      status,
      requirementId: editingScenario?.requirementId || requirementId,
      flows: editingScenario?.flows || []
    });
    setTitle("");
    setDescription("");
    setPriority("medium");
    setStatus("in_progress");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editingScenario ? "Edit Test Scenario" : "Add New Test Scenario"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter scenario title"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter scenario description"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="priority">Priority</Label>
            <Select value={priority} onValueChange={(value: Priority) => setPriority(value)}>
              <SelectTrigger id="priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(value: ScenarioStatus) => setStatus(value)}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="needs_review">Needs Review</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!title.trim()}>
            {editingScenario ? "Save Changes" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddBusinessRuleDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: () => void;
  rule: { description: string; category: string };
  onRuleChange: (rule: { description: string; category: "authentication" | "security" | "system" | "general" }) => void;
}

export const AddBusinessRuleDialog = ({ isOpen, onOpenChange, onAdd, rule, onRuleChange }: AddBusinessRuleDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Business Rule</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ruleDescription">Description</Label>
            <Input
              id="ruleDescription"
              value={rule.description}
              onChange={(e) => onRuleChange({ ...rule, description: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ruleCategory">Category</Label>
            <Select
              value={rule.category}
              onValueChange={(value) => onRuleChange({ ...rule, category: value as "authentication" | "security" | "system" | "general" })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="authentication">Authentication</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={onAdd}>Add Business Rule</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

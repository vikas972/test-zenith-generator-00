
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface BundleItemActionsProps {
  onAddFile: () => void;
}

export const BundleItemActions = ({ onAddFile }: BundleItemActionsProps) => {
  return (
    <Button onClick={onAddFile} size="sm" variant="outline" className="gap-1">
      <Plus className="h-3.5 w-3.5" />
      Add File
    </Button>
  );
};

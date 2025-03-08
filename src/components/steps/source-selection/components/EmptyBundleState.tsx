
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyBundleStateProps {
  onCreateBundle: () => void;
}

export const EmptyBundleState = ({ onCreateBundle }: EmptyBundleStateProps) => {
  return (
    <div className="text-center py-10 text-gray-500">
      <FileText className="mx-auto h-12 w-12 mb-4 text-gray-400" />
      <h3 className="text-lg font-medium mb-2">No requirement bundles yet</h3>
      <p className="mb-4">Create a new bundle to start adding documents</p>
      <Button onClick={onCreateBundle}>
        <Plus className="h-4 w-4 mr-2" />
        New Bundle
      </Button>
    </div>
  );
};

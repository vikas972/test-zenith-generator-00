
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NewBundleDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateBundle: (name: string, totalFiles: number) => void;
}

export const NewBundleDialog = ({
  isOpen,
  onOpenChange,
  onCreateBundle
}: NewBundleDialogProps) => {
  const [bundleName, setBundleName] = useState("");
  const [totalFiles, setTotalFiles] = useState(1);

  const handleCreateBundle = () => {
    onCreateBundle(bundleName, totalFiles);
    setBundleName("");
    setTotalFiles(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Requirement Bundle</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="bundleName">Bundle Name</Label>
            <Input
              id="bundleName"
              value={bundleName}
              onChange={(e) => setBundleName(e.target.value)}
              placeholder="Enter a name for this requirement bundle"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalFiles">Total Expected Files</Label>
            <Input
              id="totalFiles"
              type="number"
              min="1"
              max="10"
              value={totalFiles}
              onChange={(e) => setTotalFiles(parseInt(e.target.value) || 1)}
            />
            <p className="text-xs text-gray-500">How many documents are in this requirement bundle?</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateBundle} disabled={!bundleName.trim()}>
            Create Bundle
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

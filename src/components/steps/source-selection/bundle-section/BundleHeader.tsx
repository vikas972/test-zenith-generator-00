
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface BundleHeaderProps {
  onCreateBundle: () => void;
}

export const BundleHeader = ({ onCreateBundle }: BundleHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className="text-xl font-semibold">Requirement Bundles</CardTitle>
      <Button onClick={onCreateBundle} className="gap-2">
        <Plus className="h-4 w-4" />
        New Bundle
      </Button>
    </CardHeader>
  );
};

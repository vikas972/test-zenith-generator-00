
import { FileText } from "lucide-react";
import { RequirementBundle } from "../../types";
import { BundleSourceBadge } from "./BundleSourceBadge";

interface BundleHeaderProps {
  bundle: RequirementBundle;
}

export const BundleHeader = ({ bundle }: BundleHeaderProps) => {
  return (
    <div className="flex items-center gap-3">
      <FileText className="h-5 w-5 text-gray-500" />
      <div>
        <div className="font-medium text-gray-900">{bundle.name}</div>
        <div className="text-sm text-gray-500">
          {bundle.files.length} of {bundle.totalFiles} files • 
          {bundle.createdAt.toLocaleDateString()} • 
          <BundleSourceBadge sourceId={bundle.source} />
        </div>
      </div>
    </div>
  );
};

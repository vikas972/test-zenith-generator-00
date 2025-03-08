
import { RequirementBundle } from "../types";
import { BundleItem } from "../components/BundleItem";
import { EmptyBundleState } from "../components/EmptyBundleState";

interface BundleListProps {
  bundles: RequirementBundle[];
  expandedBundles: string[];
  selectedBundleId: string | null;
  onToggleExpand: (bundleId: string) => void;
  onDeleteBundle: (bundleId: string) => void;
  onRetryBundle: (bundleId: string) => void;
  onAddFile: (bundleId: string) => void;
  onDeleteFile: (bundleId: string, fileId: string) => void;
  onSelectBundle: (bundleId: string | null) => void;
  onImportBundle: (bundleId: string) => void;
  onCreateBundle: () => void;
}

export const BundleList = ({
  bundles,
  expandedBundles,
  selectedBundleId,
  onToggleExpand,
  onDeleteBundle,
  onRetryBundle,
  onAddFile,
  onDeleteFile,
  onSelectBundle,
  onImportBundle,
  onCreateBundle,
}: BundleListProps) => {
  if (bundles.length === 0) {
    return <EmptyBundleState onCreateBundle={onCreateBundle} />;
  }

  return (
    <div className="space-y-4">
      {bundles.map(bundle => (
        <BundleItem
          key={bundle.id}
          bundle={bundle}
          isExpanded={expandedBundles.includes(bundle.id)}
          isSelected={selectedBundleId === bundle.id}
          onToggleExpand={onToggleExpand}
          onDeleteBundle={onDeleteBundle}
          onRetryBundle={onRetryBundle}
          onAddFile={onAddFile}
          onDeleteFile={onDeleteFile}
          onSelectBundle={onSelectBundle}
          onImportBundle={onImportBundle}
        />
      ))}
    </div>
  );
};
